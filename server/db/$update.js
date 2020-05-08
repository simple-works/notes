//==============================================================================
// ■ UPDATE (crud/update.js)
//------------------------------------------------------------------------------
//     UPDATE opeation for database CRUD operations.
//=============================================================================
const { pick, omit } = require("../services/utils/");
const { findIndex, reject, alreadyInUse } = require("../services/utils/");
const { encrypt } = require("../services/crypt");
//------------------------------------------------------------------------------
const { itemNotFoundError, itemAlreadyInUseError } = require("./errors");

//------------------------------------------------------------------------------
// ● UPDATE-Opeation
//------------------------------------------------------------------------------
async function $update(collection, id, item, options = {}) {
  const {
    partial,
    unique: fieldsToUniquify,
    encrypt: fieldsToEncrypt,
    omit: fieldsToOmit,
    nocase: ignoreCase
  } = options;
  let index = findIndex(collection, { id });
  if (index < 0) {
    throw itemNotFoundError(collection.name, { id });
  }
  if (fieldsToUniquify) {
    if (
      alreadyInUse(reject(collection, { id }), pick(item, fieldsToUniquify), {
        ignoreCase
      })
    ) {
      throw itemAlreadyInUseError(collection.name, fieldsToUniquify);
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
  await collection.save();
  return omit(collection[index], fieldsToOmit);
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $update;
