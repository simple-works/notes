//==============================================================================
// ■ Database (db/index.js)
//------------------------------------------------------------------------------
//     Database access logic.
//==============================================================================
const $create = require("./crud/create");
const $read = require("./crud/read");
const $update = require("./crud/update");
const $delete = require("./crud/delete");
const { $load } = require("./file");

//------------------------------------------------------------------------------
// ● Load-Database-API
//------------------------------------------------------------------------------
function loadDatabaseAPI(collectionName) {
  return {
    async read(query, options) {
      return await $read(await $load(), collectionName, query, options);
    },
    async create(item, options) {
      return await $create(await $load(), collectionName, item, options);
    },
    async update(id, item, options) {
      return await $update(await $load(), collectionName, id, item, options);
    },
    async delete(id, options) {
      return await $delete(await $load(), collectionName, id, options);
    }
  };
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = loadDatabaseAPI;
