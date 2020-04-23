//==============================================================================
// ■ Token (token.js)
//------------------------------------------------------------------------------
//     Generate and verify access tokens.
//==============================================================================
const jwt = require("jsonwebtoken");

//------------------------------------------------------------------------------
// ● Secret-Or-Private-Key
//------------------------------------------------------------------------------
const secretOrPrivateKey = "ambratolm-secret-1980";

//------------------------------------------------------------------------------
// ● Sign-Data
//------------------------------------------------------------------------------
function sign({ id, email, name }) {
  const payload = { email, name };
  const options = { subject: id, expiresIn: "30d" };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

//------------------------------------------------------------------------------
// ● Verify-Token
//------------------------------------------------------------------------------
function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPrivateKey, (err, accessData) => {
      if (err) {
        reject(err);
      } else {
        resolve(accessData);
      }
    });
  });
}

//------------------------------------------------------------------------------
// ● Exports
//------------------------------------------------------------------------------
module.exports = { sign, verify };
