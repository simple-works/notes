//==============================================================================
// ■ Crypt (crypt.js)
//------------------------------------------------------------------------------
//     Crypting utility functions.
//==============================================================================
const bcrypt = require("bcryptjs");

module.exports = {
  async encrypt(text) {
    return await bcrypt.hash(text, 12);
  },
  async check(text, hash) {
    return await bcrypt.compare(text, hash);
  }
};
