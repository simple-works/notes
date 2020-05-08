//==============================================================================
// ■ Database-File (db/file.js)
//------------------------------------------------------------------------------
//     Database file system IO opeations.
//==============================================================================
const fs = require("fs");
const path = require("path");

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
      reject(new Error("Invalid database file"));
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
// ● Exports
//------------------------------------------------------------------------------
module.exports = {
  $save,
  $load
};
