//==============================================================================
// ■ Database-File (db/file.js)
//------------------------------------------------------------------------------
//     Database file system IO opeations.
//==============================================================================
const fs = require("fs");
const path = require("path");
const { NotFoundError } = require("common-errors");

//------------------------------------------------------------------------------
// ● Database-File-Path
//------------------------------------------------------------------------------
const dataPath = path.join(__dirname, "../db.json");

//------------------------------------------------------------------------------
// ● Load-Database
//------------------------------------------------------------------------------
async function $load() {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

//------------------------------------------------------------------------------
// ● Save-Database
//------------------------------------------------------------------------------
async function $save(data) {
  return new Promise((resolve, reject) => {
    const dataJson = JSON.stringify(data, null, 2);
    if (dataJson === undefined) {
      reject(new Error("Wrong data object"));
    } else {
      fs.writeFile(dataPath, dataJson, "utf-8", err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
  });
}

//------------------------------------------------------------------------------
// ● Extract-Collection
//------------------------------------------------------------------------------
function $collection(data, name) {
  const collection = data[name];
  if (!collection) {
    throw new NotFoundError(`[${name}] collection doesn't exist`);
  }
  return collection;
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = {
  $save,
  $load,
  $collection
};
