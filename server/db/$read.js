//==============================================================================
// ■ READ (crud/read.js)
//------------------------------------------------------------------------------
//     READ opeation for database CRUD operations.
//=============================================================================
const { isEmpty, isMatchWith } = require("../services/utils/");
const { omit, find, orderBy } = require("../services/utils/");
const { filterAndMap, paginate } = require("../services/utils/");
const { comparePrimitives } = require("../services/utils/");
const { check } = require("../services/crypt");
//------------------------------------------------------------------------------
const {
  itemNotFoundError,
  encryptedFieldNotMatchedError
} = require("./errors");

//------------------------------------------------------------------------------
// ● READ-Opeation
//------------------------------------------------------------------------------
async function $read(collection, query = {}, options = {}, utils = {}) {
  const { one: oneItem, count } = options;
  if (oneItem) {
    const item = await _readOneItem(collection, query, options, utils);
    return count ? (isEmpty(item) ? 0 : 1) : item;
  } else {
    const items = await _readManyItems(collection, query, options, utils);
    return count ? items.length : items;
  }
}

//------------------------------------------------------------------------------
// ● Utils
//------------------------------------------------------------------------------
async function _readOneItem(collection, query, options, utils) {
  const {
    decrypt: queryToDecrypt,
    omit: fieldsToOmit,
    expand: expandCollectionName,
    embed: embedCollectionName,
    nocase: ignoreCase
  } = options;
  const { expand, embed } = utils;
  let item = find(collection, _matches(query, { ignoreCase }));
  if (!item) {
    throw itemNotFoundError(collection.name, query);
  }
  if (queryToDecrypt) {
    await _checkEncryptedFields(item, queryToDecrypt);
  }
  if (expandCollectionName) {
    item = expand(item, expandCollectionName);
  }
  if (embedCollectionName) {
    item = embed(item, collection.name, embedCollectionName);
  }
  return omit(item, fieldsToOmit);
}
async function _readManyItems(collection, query, options, utils) {
  const {
    decrypt: queryToDecrypt,
    omit: fieldsToOmit,
    limit: perPage,
    page: pageNumber,
    sort: fieldsToSortBy,
    order: ordersToSortBy,
    expand: expandCollectionName,
    embed: embedCollectionName,
    nocase: ignoreCase
  } = options;
  const { expand, embed } = utils;
  collection = orderBy(collection, fieldsToSortBy, ordersToSortBy);
  let items = filterAndMap(
    collection,
    _matches(query, { ignoreCase }),
    _omit(fieldsToOmit)
  );
  if (queryToDecrypt) {
    for (const item of items) {
      await _checkEncryptedFields(item, queryToDecrypt);
    }
  }
  items = paginate(items, perPage, pageNumber);
  if (expandCollectionName) {
    items = items.map(item => expand(item, expandCollectionName));
  }
  if (embedCollectionName) {
    items = items.map(item =>
      embed(item, collection.name, embedCollectionName)
    );
  }
  return items;
}
//------------------------------------------------------------------------------
function _matches(query, options = {}) {
  return item =>
    isMatchWith(item, query, (itemValue, queryValue) => {
      return comparePrimitives(itemValue, queryValue, options);
    });
}
function _omit(fields) {
  return item => omit(item, fields);
}
async function _checkEncryptedFields(item, query) {
  for (const prop in query) {
    if (!(await check(query[prop], item[prop]))) {
      throw encryptedFieldNotMatchedError(prop);
    }
  }
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $read;
