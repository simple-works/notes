//==============================================================================
// ■ Note-Schema (note-schema.js)
//------------------------------------------------------------------------------
//     Note schema validation logic.
//==============================================================================
const Joi = require("@hapi/joi");

//------------------------------------------------------------------------------
// ● Rules
//------------------------------------------------------------------------------
const rules = {
  id: Joi.string().guid({ version: "uuidv4" }),
  userId: Joi.string().guid({ version: "uuidv4" }),
  title: Joi.string()
    .min(3)
    .max(30),
  content: Joi.string()
    .min(10)
    .max(1000)
};

//------------------------------------------------------------------------------
// ● CREATE-Operations-Validation
//------------------------------------------------------------------------------
async function validateForCreate(note) {
  return Joi.object({
    userId: rules.userId.required(),
    title: rules.title.required(),
    content: rules.content.required()
  }).validateAsync(note);
}

//------------------------------------------------------------------------------
// ● UPDATE-Operations-Validation
//------------------------------------------------------------------------------
async function validateForUpdate(note) {
  return Joi.object({
    userId: rules.userId,
    title: rules.title,
    content: rules.content
  }).validateAsync(note);
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  validateForCreate,
  validateForUpdate
};
