//==============================================================================
// ■ DELETE (crud/delete.js)
//------------------------------------------------------------------------------
//     DELETE opeation for database CRUD operations.
//=============================================================================
const { matches, remove } = require("../services/utils/");
//------------------------------------------------------------------------------
const { itemNotFoundError } = require("./errors");

//------------------------------------------------------------------------------
// ● DELETE-Operation
//------------------------------------------------------------------------------
async function $delete(collection, id, options = {}) {
  const { omit: fieldsToOmit } = options;
  const item = remove(collection, matches({ id }))[0];
  if (!item) {
    throw itemNotFoundError(collection.name, { id });
  }
  await collection.save();
  return omit(item, fieldsToOmit);
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $delete;
