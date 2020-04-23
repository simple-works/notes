//==============================================================================
// ■ Router-Guards (router/guards.js)
//------------------------------------------------------------------------------
//     Route guarding functions.
//==============================================================================
const { HttpStatusError } = require("common-errors");
const { AuthenticationRequiredError } = require("common-errors");
//------------------------------------------------------------------------------
const { verify } = require("../services/token");

//------------------------------------------------------------------------------
// ● User-Only
//------------------------------------------------------------------------------
async function userOnly(req, res, next) {
  let token = "";
  try {
    token = _extractAccessTokenFromHeaders(req.headers);
    req.accessData = await verify(token);
    next();
  } catch (err) {
    err.status = 401;
    next(new HttpStatusError(err, req));
  }
}

//------------------------------------------------------------------------------
// ● Utils
//------------------------------------------------------------------------------
function _extractAccessTokenFromHeaders(headers) {
  const { authorization } = headers;
  if (!authorization) {
    throw new AuthenticationRequiredError("Missing authorization header");
  }
  const [scheme, accessToken] = authorization.split(" ");
  if (scheme !== "Bearer") {
    throw new AuthenticationRequiredError("Incorrect authorization scheme");
  }
  if (!accessToken) {
    throw new AuthenticationRequiredError("Missing access token");
  }
  return accessToken;
}
// function _extractAccessTokenFromCookies(cookies) {
//   const { accessToken } = cookies;
//   if (!accessToken) {
//     throw new AuthenticationRequiredError("Missing access token cookie");
//   }
//   return accessToken;
// }

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
module.exports = {
  userOnly
};
