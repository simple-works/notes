//==============================================================================
// ■ CREATE (crud/create.js)
//------------------------------------------------------------------------------
//     CREATE opeation for database CRUD operations.
//=============================================================================
const { v4: uuidv4 } = require("uuid");
//------------------------------------------------------------------------------
const { encrypt } = require("../services/crypt");
const { pick, omit, alreadyInUse } = require("../services/utils/");
//------------------------------------------------------------------------------
const { itemAlreadyInUseError } = require("./errors");

//------------------------------------------------------------------------------
// ● CREATE-Operation
//------------------------------------------------------------------------------
async function $create(collection, item, options = {}) {
  const {
    unique: fieldsToUniquify,
    encrypt: fieldsToEncrypt,
    omit: fieldsToOmit,
    nocase: ignoreCase
  } = options;
  if (fieldsToUniquify) {
    if (
      alreadyInUse(collection, pick(item, fieldsToUniquify), { ignoreCase })
    ) {
      throw itemAlreadyInUseError(collection.name, fieldsToUniquify);
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
  await collection.save();
  return omit(item, fieldsToOmit);
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $create;
