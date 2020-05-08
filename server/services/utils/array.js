//==============================================================================
// ■ Array (array.js)
//------------------------------------------------------------------------------
//     Array related utility functions.
//==============================================================================
const { partiallyMatches } = require("./object");

//------------------------------------------------------------------------------
// ● Third-Party-Wraps
//------------------------------------------------------------------------------
const { find, findIndex, reject, remove, orderBy } = require("lodash");
const wraps = {
  find,
  findIndex,
  reject,
  remove,
  orderBy
};

//------------------------------------------------------------------------------
// ● Array-Utils
//------------------------------------------------------------------------------
function alreadyInUse(arr, query, options) {
  // let expressions = [];
  // for (const prop in query) {
  //   expressions.push(`item.${prop} === query.${prop}`);
  // }
  // const statement = `item => ${expressions.join(" || ")}`;
  // return arr.findIndex(eval(statement)) >= 0;
  return arr.findIndex(partiallyMatches(query, options)) >= 0;
}
//------------------------------------------------------------------------------
function paginate(arr = [], limit, page) {
  if (!limit && !page) {
    return arr;
  }
  limit = Number(limit);
  page = Number(page);
  if (isNaN(limit)) {
    limit = 10;
  }
  if (isNaN(page)) {
    page = 1;
  }
  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0) {
    limit = 1;
  }
  if (limit > arr.length) {
    limit = arr.length;
  }
  const start = (page - 1) * limit;
  const end = (page - 1) * limit + limit;
  return arr.slice(start, end);
}
//------------------------------------------------------------------------------
function filterAndMap(arr = [], filterFn, mapFn) {
  if (typeof filterFn !== "function") {
    throw new Error("filterFn must be a function");
  }
  if (typeof mapFn !== "function") {
    throw new Error("mapFn must be a function");
  }
  return arr.reduce((stack, item) => {
    if (filterFn(item)) stack.push(mapFn(item));
    return stack;
  }, []);
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  ...wraps,
  alreadyInUse,
  paginate,
  filterAndMap
};
