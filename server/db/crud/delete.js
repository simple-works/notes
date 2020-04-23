//==============================================================================
// ■ DELETE (crud/delete.js)
//------------------------------------------------------------------------------
//     DELETE opeation for database CRUD operations.
//=============================================================================
const { NotFoundError } = require("common-errors");
const { matches, remove, omit } = require("lodash");
//------------------------------------------------------------------------------
const { $collection, $save } = require("../file");

//------------------------------------------------------------------------------
// ● DELETE-Operation
//------------------------------------------------------------------------------
async function $delete(data, collectionName, id, options = {}) {
  const { omit: fieldsToOmit } = options;
  const collection = $collection(data, collectionName);
  const item = remove(collection, matches({ id }))[0];
  if (!item) {
    throw new NotFoundError(collectionName);
  }
  await $save(data);
  return omit(item, fieldsToOmit);
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = $delete;
