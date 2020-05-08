//==============================================================================
// ■ Primitive (primitive.js)
//------------------------------------------------------------------------------
//     Primitive related utility functions.
//==============================================================================

//------------------------------------------------------------------------------
// ● Third-Party-Wraps
//------------------------------------------------------------------------------
const { singularize } = require("i")();
const wraps = {
  singularize
};

//------------------------------------------------------------------------------
// ● Primitive-Utils
//------------------------------------------------------------------------------
function stringToArray(str) {
  return str ? (Array.isArray(str) ? str : [str]) : [];
}
//------------------------------------------------------------------------------
function comparePrimitives(valueA, valueB, options = {}) {
  const { trim = false, ignoreCase = false } = options;
  if (typeof valueA === typeof valueB) {
    if (typeof valueA === "string") {
      if (trim) {
        valueA = valueA.trim();
        valueB = valueB.trim();
      }
      if (ignoreCase) {
        valueA = valueA.toUpperCase();
        valueB = valueB.toUpperCase();
      }
    }
    return valueA === valueB;
  }
  return false;
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  ...wraps,
  stringToArray,
  comparePrimitives
};
