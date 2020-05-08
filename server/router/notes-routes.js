//==============================================================================
// ■ Notes-Routes (notes-routes.js)
//------------------------------------------------------------------------------
//     "Notes" API endpoints.
//==============================================================================
const express = require("express");
const { NotFoundError, NotPermittedError } = require("common-errors");
const { HttpStatusError } = require("common-errors");
//------------------------------------------------------------------------------
const schema = require("../schemas/note-schema");
//------------------------------------------------------------------------------
const { userOnly } = require("./guards");

//------------------------------------------------------------------------------
// ● Router
//------------------------------------------------------------------------------
const router = express.Router();

//------------------------------------------------------------------------------
// ● Check-Resource-Ownership
//------------------------------------------------------------------------------
async function checkOwnership(req) {
  const note = await req.app.locals
    .db("notes")
    .read({ id: req.params.id }, { one: true });
  if (!note) throw new NotFoundError("Note");
  if (req.accessData && req.accessData.sub !== note.userId)
    throw new NotPermittedError("Note not owned");
}

//------------------------------------------------------------------------------
// ● GET-Methods
//------------------------------------------------------------------------------
router.get("/notes", async (req, res, next) => {
  try {
    const notes = await req.app.locals.db("notes").read(req.query, {
      sort: ["createdAt"],
      order: ["desc"],
      ...req.options
    });
    res.json(notes);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ● POST-Methods
//------------------------------------------------------------------------------
router.post("/notes", userOnly, async (req, res, next) => {
  try {
    let note = await schema.validateForCreate(req.body);
    note = await req.app.locals.db("notes").create(note);
    res.json(note);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ● PUT-Methods
//------------------------------------------------------------------------------
router.put("/notes/:id", userOnly, async (req, res, next) => {
  try {
    await checkOwnership(req);
    let note = await schema.validateForCreate(req.body);
    note = await req.app.locals
      .db("notes")
      .update(req.params.id, note, { partial: false });
    res.json(note);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ● PATCH-Methods
//------------------------------------------------------------------------------
router.patch("/notes/:id", userOnly, async (req, res, next) => {
  try {
    await checkOwnership(req);
    let note = await schema.validateForUpdate(req.body);
    note = await req.app.locals
      .db("notes")
      .update(req.params.id, note, { partial: true });
    res.json(note);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ● DELETE-Methods
//------------------------------------------------------------------------------
router.delete("/notes/:id", userOnly, async (req, res, next) => {
  try {
    await checkOwnership(req);
    const note = await req.app.locals.db("notes").delete(req.params.id);
    res.json(note);
  } catch (err) {
    next(new HttpStatusError(err, req));
  }
});

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = router;
