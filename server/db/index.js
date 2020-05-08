//==============================================================================
// ■ Database (db/index.js)
//------------------------------------------------------------------------------
//     Database access logic.
//==============================================================================
const { ArgumentNullError, NotFoundError } = require("common-errors");
//------------------------------------------------------------------------------
const { singularize, expand, embed } = require("../services/utils/");
//------------------------------------------------------------------------------
const $create = require("./$create");
const $read = require("./$read");
const $update = require("./$update");
const $delete = require("./$delete");
const { $load, $save } = require("./file");

//------------------------------------------------------------------------------
// ● Load-Database-API
//------------------------------------------------------------------------------
async function loadDatabaseAPI() {
  const data = await $load();
  return function(name) {
    const utils = _utils(data);
    const collection = _extractCollection(name, data);
    collection.save = async () => $save(data);
    collection.name = name;
    return {
      data,
      async read(query = {}, options = {}) {
        return await $read(collection, query, options, utils);
      },
      async create(item, options = {}) {
        if (!item) new ArgumentNullError("item");
        return await $create(collection, item, options, utils);
      },
      async update(id, item, options = {}) {
        if (!id) new ArgumentNullError("id");
        if (!item) new ArgumentNullError("item");
        return await $update(collection, id, item, options, utils);
      },
      async delete(id, options = {}) {
        if (!id) new ArgumentNullError("id");
        return await $delete(collection, id, options, utils);
      }
    };
  };
}

//------------------------------------------------------------------------------
// ● Utils
//------------------------------------------------------------------------------
function _extractCollection(name, data) {
  const collection = data[name];
  if (!collection) {
    throw new NotFoundError(`[${name}] collection doesn't exist`);
  }
  return collection;
}
function _utils(data) {
  return {
    expand(item, expandCollectionName) {
      return expand(item, {
        localField: `${singularize(expandCollectionName)}Id`,
        foreignField: "id",
        foreignArray: _extractCollection(expandCollectionName, data),
        newField: singularize(expandCollectionName)
      });
    },
    embed(item, srcCollectionName, embedCollectionName) {
      return embed(item, {
        localField: "id",
        foreignField: `${singularize(srcCollectionName)}Id`,
        foreignArray: _extractCollection(embedCollectionName, data),
        newField: embedCollectionName
      });
    }
  };
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = loadDatabaseAPI;
