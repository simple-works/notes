//==============================================================================
// ■ Router-Guards (router/guards.js)
//------------------------------------------------------------------------------
//     Route guarding functions.
//==============================================================================
import store from "../store";

function currentUser() {
  return store.getters.currentUser;
}

export default {
  publicOnly(to, from, next) {
    if (currentUser()) {
      next(false);
    } else {
      next();
    }
  },
  userOnly(to, from, next) {
    if (currentUser()) {
      next();
    } else {
      next({ name: "Login", query: { ref: to.name } });
    }
  },
  adminOnly(to, from, next) {
    if (currentUser() && currentUser().role === "admin") {
      next();
    } else {
      next({ name: "Login", query: { ref: to.name } });
    }
  }
};
