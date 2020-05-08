//==============================================================================
// ■ Utils (utils.js)
//------------------------------------------------------------------------------
//     General object and array related utility functions.
//==============================================================================
const primitiveUtils = require("./primitive");
const arrayUtils = require("./array");
const objectUtils = require("./object");
const otherUtils = require("./other");

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  ...primitiveUtils,
  ...arrayUtils,
  ...objectUtils,
  ...otherUtils
};
