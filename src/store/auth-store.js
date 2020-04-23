//==============================================================================
// ■ Auth-Store (auth-store.js)
//------------------------------------------------------------------------------
//     Authentication store.
//==============================================================================
import api from "@/api/";

//------------------------------------------------------------------------------
// ● Store
//------------------------------------------------------------------------------
export default {
  state: {
    currentUser: null
  },
  getters: {
    currentUser: state => state.currentUser
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = { ...state.currentUser, ...user };
    },
    logout(state) {
      state.currentUser = null;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const user = await api("login").create({ email, password });
      commit("setCurrentUser", user);
      return user;
    },
    async register({ commit }, { email, password, ...other }) {
      const user = await api("users").create({ email, password, ...other });
      commit("setCurrentUser", user);
      return user;
    }
  }
};
