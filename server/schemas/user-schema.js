//==============================================================================
// ■ User-Schema (user-schema.js)
//------------------------------------------------------------------------------
//     User schema validation logic.
//==============================================================================
const Joi = require("@hapi/joi");

//------------------------------------------------------------------------------
// ● Rules
//------------------------------------------------------------------------------
const rules = {
  id: Joi.string().guid({ version: "uuidv4" }),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string()
    .min(8)
    .max(80),
  name: Joi.string()
    .min(3)
    .max(30),
  description: Joi.string()
    .max(100)
    .allow(""),
  avatar: Joi.string().allow(""),
  role: Joi.string()
    .valid("", "admin")
    .lowercase()
};

//------------------------------------------------------------------------------
// ● Authentication-Validation
//------------------------------------------------------------------------------
async function validateForAuth(user) {
  return Joi.object({
    email: rules.email.required(),
    password: rules.password.required()
  }).validateAsync(user);
}

//------------------------------------------------------------------------------
// ● CREATE-Operations-Validation
//------------------------------------------------------------------------------
async function validateForCreate(user) {
  return Joi.object({
    email: rules.email.required(),
    password: rules.password.required(),
    name: rules.name.required(),
    description: rules.description,
    avatar: rules.avatar,
    role: rules.role
  }).validateAsync(user);
}

//------------------------------------------------------------------------------
// ● UPDATE-Operations-Validation
//------------------------------------------------------------------------------
async function validateForUpdate(user) {
  return Joi.object({
    email: rules.email,
    password: rules.password,
    name: rules.name,
    description: rules.description,
    avatar: rules.avatar,
    role: rules.role
  }).validateAsync(user);
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  validateForAuth,
  validateForCreate,
  validateForUpdate
};
