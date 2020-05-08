//==============================================================================
// ■ Errors (db/errors.js)
//------------------------------------------------------------------------------
//     Throwable custom error objects with appropriate messages.
//==============================================================================
const { NotFoundError, AlreadyInUseError } = require("common-errors");
//------------------------------------------------------------------------------
const { singularize } = require("../services/utils/");

//------------------------------------------------------------------------------
// ● Errors-Functions
//------------------------------------------------------------------------------
function itemNotFoundError(collectionName = "", query = null) {
  const itemName = singularize(collectionName);
  const message = query
    ? `${itemName} with ${JSON.stringify(query)} not found`
    : `${itemName} not found`;
  return new NotFoundError(message);
}
function itemAlreadyInUseError(collectionName = "", fieldsToUniquify = []) {
  return new AlreadyInUseError(
    singularize(collectionName),
    fieldsToUniquify.join(" or ")
  );
}
function encryptedFieldNotMatchedError(prop) {
  return new NotFoundError(
    `${prop} not matched`,
    "Check_Encrypted_Fields",
    prop
  );
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  itemNotFoundError,
  itemAlreadyInUseError,
  encryptedFieldNotMatchedError
};
