//==============================================================================
// ■ UPDATE (crud/update.js)
//------------------------------------------------------------------------------
//     UPDATE opeation for database CRUD operations.
//=============================================================================
const { AlreadyInUseError, NotFoundError } = require("common-errors");
const { omit, findIndex, pick, reject } = require("lodash");
//------------------------------------------------------------------------------
const { alreadyInUse } = require("../../services/array");
const { encrypt } = require("../../services/crypt");
//------------------------------------------------------------------------------
const { $collection, $save } = require("../file");

//------------------------------------------------------------------------------
// ● UPDATE-Opeation
//------------------------------------------------------------------------------
async function $update(data, collectionName, id, item, options = {}) {
  const {
    partial,
    unique: fieldsToUniquify,
    encrypt: fieldsToEncrypt,
    omit: fieldsToOmit
  } = options;
  const collection = $collection(data, collectionName);
  let index = findIndex(collection, { id });
  if (index < 0) {
    throw new NotFoundError(collectionName);
  }
  if (fieldsToUniquify) {
    if (
      alreadyInUse(reject(collection, { id }), pick(item, fieldsToUniquify))
    ) {
      throw new AlreadyInUseError(collectionName, fieldsToUniquify.toString());
    }
  }
  if (fieldsToEncrypt) {
    for (const field of fieldsToEncrypt) {
      if (item[field]) {
        item[field] = await encrypt(item[field]);
      }
    }
  }
  item.updatedAt = new Date();
  collection[index] = partial
    ? { ...collection[index], ...item }
    : { id, ...item };
  await $save(data);
  return omit(collection[index], fieldsToOmit);
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $update;
