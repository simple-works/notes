//==============================================================================
// ■ Object (object.js)
//------------------------------------------------------------------------------
//     Object related utility functions.
//==============================================================================
const { comparePrimitives } = require("./primitive");

//------------------------------------------------------------------------------
// ● Third-Party-Wraps
//------------------------------------------------------------------------------
const { pick, omit, matches, isEmpty, isMatchWith } = require("lodash");
const wraps = {
  pick,
  omit,
  matches,
  isEmpty,
  isMatchWith
};

//------------------------------------------------------------------------------
// ● Object-Utils
//------------------------------------------------------------------------------
function isPartialMatch(obj, query, options) {
  for (const prop in query) {
    if (comparePrimitives(obj[prop], query[prop], options)) {
      return true;
    }
  }
  return false;
}
//------------------------------------------------------------------------------
function partiallyMatches(query, options) {
  return obj => isPartialMatch(obj, query, options);
}
//------------------------------------------------------------------------------
function expand(obj = {}, query = {}) {
  const {
    localField = "someId",
    foreignField = "id",
    foreignArray = [],
    newField = `${localField}_expandation`
  } = query;
  const item = { ...obj };
  item[newField] = foreignArray.find(
    foreignItem => foreignItem[foreignField] === item[localField]
  );
  return item;
}
//------------------------------------------------------------------------------
function embed(obj = {}, query = {}) {
  const {
    localField = "id",
    foreignField = "someId",
    foreignArray = [],
    newField = "embedment",
    count = false
  } = query;
  const item = { ...obj };
  const result = foreignArray.filter(
    foreignItem => foreignItem[foreignField] === item[localField]
  );
  item[newField] = count ? result.length : result;
  return item;
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  ...wraps,
  isPartialMatch,
  partiallyMatches,
  expand,
  embed
};
