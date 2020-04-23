//==============================================================================
// ■ Users-Routes (users-routes.js)
//------------------------------------------------------------------------------
//     "Users" API endpoints.
//==============================================================================
const express = require("express");
const { HttpStatusError, NotPermittedError } = require("common-errors");
//------------------------------------------------------------------------------
const db = require("../db/");
const schema = require("../schemas/user-schema");
const { sign } = require("../services/token");
//------------------------------------------------------------------------------
const { userOnly } = require("./guards");

//------------------------------------------------------------------------------
// ● Router
//------------------------------------------------------------------------------
const router = express.Router();

//------------------------------------------------------------------------------
// ● Utils
//------------------------------------------------------------------------------
function checkOwnership(req) {
  if (req.accessData && req.accessData.sub !== req.params.id)
    throw new NotPermittedError("User not owned");
}

//------------------------------------------------------------------------------
// ● GET-Methods
//------------------------------------------------------------------------------
router.get("/users", async (req, res, next) => {
  try {
    let fieldsToOmit = req.options.omit;
    if (fieldsToOmit) {
      if (!Array.isArray(fieldsToOmit)) {
        fieldsToOmit = [fieldsToOmit];
      }
    } else {
      fieldsToOmit = [];
    }
    fieldsToOmit.push("email", "password");
    req.options.omit = fieldsToOmit;
    const users = await db("users").read(req.query, req.options);
    res.json(users);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ● POST-Methods
//------------------------------------------------------------------------------
router.post("/users|register|signup", async (req, res, next) => {
  try {
    let user = await schema.validateForCreate(req.body);
    user = await db("users").create(user, {
      unique: ["email", "name"],
      encrypt: ["password"],
      omit: ["password"]
    });
    user.accessToken = await sign(user);
    res.json(user);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});
//------------------------------------------------------------------------------
router.post("/login|signin", async (req, res, next) => {
  try {
    const { email, password } = await schema.validateForAuth(req.body);
    const user = await db("users").read(
      { email },
      { one: true, decrypt: { password }, omit: ["password"] }
    );
    user.accessToken = await sign(user);
    res.json(user);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ● PUT-Methods
//------------------------------------------------------------------------------
router.put("/users/:id", userOnly, async (req, res, next) => {
  try {
    checkOwnership(req);
    let user = await schema.validateForCreate(req.body);
    user = await db("users").update(req.params.id, user, {
      partial: false,
      unique: ["email", "name"],
      encrypt: ["password"],
      omit: ["password"]
    });
    res.json(user);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ● PATCH-Methods
//------------------------------------------------------------------------------
router.patch("/users/:id", userOnly, async (req, res, next) => {
  try {
    checkOwnership(req);
    let user = await schema.validateForUpdate(req.body);
    user = await db("users").update(req.params.id, user, {
      partial: true,
      unique: ["email", "name"],
      encrypt: ["password"],
      omit: ["password"]
    });
    res.json(user);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ● DELETE-Methods
//------------------------------------------------------------------------------
router.delete("/users/:id", userOnly, async (req, res, next) => {
  try {
    checkOwnership(req);
    const user = await db("users").delete(req.params.id, {
      omit: ["password"]
    });
    res.json(user);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = router;
