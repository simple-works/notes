//==============================================================================
// ■ Router (router/index.js)
//------------------------------------------------------------------------------
//     Router main entry point.
//==============================================================================
const express = require("express");
const { HttpStatusError, NotFoundError } = require("common-errors");
//------------------------------------------------------------------------------
const routes = [require("./users-routes"), require("./notes-routes")];

//------------------------------------------------------------------------------
// ● Router
//------------------------------------------------------------------------------
const router = express.Router();

//------------------------------------------------------------------------------
// ● Extract-Request-Options
//------------------------------------------------------------------------------
router.use((req, res, next) => {
  req.options = {};
  for (const prop in req.query)
    if (prop.startsWith("$") || prop.startsWith("_")) {
      req.options[prop.substring(1)] = req.query[prop];
      delete req.query[prop];
    }
  next();
});

//------------------------------------------------------------------------------
// ● Main-Routes
//------------------------------------------------------------------------------
router.use(routes);

//------------------------------------------------------------------------------
// ● Other-Routes
//------------------------------------------------------------------------------
router.get("/", (req, res) => {
  res.send("Amb-Notes API Root Endpoint");
});
router.all(/.*/, function(req, res, next) {
  next(new HttpStatusError(new NotFoundError(req.url), req));
});

//------------------------------------------------------------------------------
// ● Error-Handler
//------------------------------------------------------------------------------
router.use((err, req, res, next) => {
  if (!err) next();
  let { status, name, message, stack } = err;
  console.error(name.bgDanger, message.danger);
  if (process.env.NODE_ENV !== "production") console.error(stack.danger);
  if (!status) status = 500;
  res.status(status).json({
    status,
    name,
    message
  });
});

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = router;
