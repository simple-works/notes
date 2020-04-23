//==============================================================================
// ■ READ (crud/read.js)
//------------------------------------------------------------------------------
//     READ opeation for database CRUD operations.
//=============================================================================
const { NotFoundError } = require("common-errors");
const { isEmpty, matches, find, omit, orderBy } = require("lodash");
const { singularize } = require("i")();
//------------------------------------------------------------------------------
const { filterAndMap, paginate } = require("../../services/array");
const { expandField, embedField } = require("../../services/array");
const { check } = require("../../services/crypt.js");
//------------------------------------------------------------------------------
const { $collection } = require("../file");

//------------------------------------------------------------------------------
// ● CREATE-Opeation
//------------------------------------------------------------------------------
async function $read(data, collectionName, query, options = {}) {
  const { one: oneItem, count } = options;
  if (oneItem) {
    const item = await _readOneItem(data, collectionName, query, options);
    return count ? (isEmpty(item) ? 0 : 1) : item;
  } else {
    const items = await _readManyItems(data, collectionName, query, options);
    return count ? items.length : items;
  }
}

//------------------------------------------------------------------------------
// ● Utils
//------------------------------------------------------------------------------
async function _readOneItem(data, collectionName, query, options = {}) {
  const {
    decrypt: queryToDecrypt,
    omit: fieldsToOmit,
    expand: expandCollectionName,
    embed: embedCollectionName
  } = options;
  const collection = $collection(data, collectionName);
  let item = find(collection, query);
  if (!item) {
    throw new NotFoundError(singularize(collectionName));
  }
  if (queryToDecrypt) {
    await _checkEncryptedFields(item, queryToDecrypt);
  }
  if (expandCollectionName) {
    item = _expandField(item, data, expandCollectionName);
  }
  if (embedCollectionName) {
    item = _embedField(item, data, collectionName, embedCollectionName);
  }
  return omit(item, fieldsToOmit);
}
async function _readManyItems(data, collectionName, query, options = {}) {
  const {
    decrypt: queryToDecrypt,
    omit: fieldsToOmit,
    limit: perPage,
    page: pageNumber,
    sort: fieldsToSortBy,
    order: ordersToSortBy,
    expand: expandCollectionName,
    embed: embedCollectionName
  } = options;
  const collection = orderBy(
    $collection(data, collectionName),
    fieldsToSortBy,
    ordersToSortBy
  );
  // matches(query) is case sensitive !
  let items = filterAndMap(collection, matches(query), item =>
    omit(item, fieldsToOmit)
  );
  if (queryToDecrypt) {
    for (const item of items) {
      await _checkEncryptedFields(item, queryToDecrypt);
    }
  }
  items = paginate(items, perPage, pageNumber);
  if (expandCollectionName) {
    items = _expandField(items, data, expandCollectionName);
  }
  if (embedCollectionName) {
    items = _embedField(items, data, collectionName, embedCollectionName);
  }
  return items;
}
//------------------------------------------------------------------------------
function _expandField(itemsOrItem, data, expandCollectionName) {
  return expandField(itemsOrItem, {
    localField: `${singularize(expandCollectionName)}Id`,
    foreignField: "id",
    foreignArray: $collection(data, expandCollectionName),
    newField: singularize(expandCollectionName)
  });
}
function _embedField(itemsOrItem, data, collectionName, embedCollectionName) {
  return embedField(itemsOrItem, {
    localField: "id",
    foreignField: `${singularize(collectionName)}Id`,
    foreignArray: $collection(data, embedCollectionName),
    newField: embedCollectionName
  });
}
//------------------------------------------------------------------------------
async function _checkEncryptedFields(item, query) {
  for (const prop in query) {
    if (!(await check(query[prop], item[prop]))) {
      throw new NotFoundError(
        "Encrypted field not matched",
        "Check_Encrypted_Fields",
        prop
      );
    }
  }
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $read;
