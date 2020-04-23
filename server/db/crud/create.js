//==============================================================================
// ■ CREATE (crud/create.js)
//------------------------------------------------------------------------------
//     CREATE opeation for database CRUD operations.
//=============================================================================
const { AlreadyInUseError } = require("common-errors");
const { pick, omit } = require("lodash");
const { v4: uuidv4 } = require("uuid");
//------------------------------------------------------------------------------
const { alreadyInUse } = require("../../services/array");
const { encrypt } = require("../../services/crypt");
//------------------------------------------------------------------------------
const { $collection, $save } = require("../file");

//------------------------------------------------------------------------------
// ● CREATE-Operation
//------------------------------------------------------------------------------
async function $create(data, collectionName, item, options = {}) {
  const {
    unique: fieldsToUniquify,
    encrypt: fieldsToEncrypt,
    omit: fieldsToOmit
  } = options;
  const collection = $collection(data, collectionName);
  if (fieldsToUniquify) {
    if (alreadyInUse(collection, pick(item, fieldsToUniquify))) {
      throw new AlreadyInUseError(collectionName, fieldsToUniquify.toString());
    }
  }
  if (fieldsToEncrypt) {
    for (const field of fieldsToEncrypt) {
      item[field] = await encrypt(item[field]);
    }
  }
  item.id = uuidv4();
  item.createdAt = new Date();
  collection.push(item);
  await $save(data);
  return omit(item, fieldsToOmit);
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $create;
