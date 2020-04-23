//==============================================================================
// ■ API (api/index.js)
//------------------------------------------------------------------------------
//     Application backend REST-API.
//==============================================================================

//------------------------------------------------------------------------------
// ● Client
//------------------------------------------------------------------------------
import axios from "axios";
const client = axios.create({
  baseURL: "/api",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

//------------------------------------------------------------------------------
// ● Authorization-Header
//------------------------------------------------------------------------------
import store from "../store/";
client.interceptors.request.use(
  config => {
    const currentUser = store.getters.currentUser;
    if (currentUser) {
      config.headers["Authorization"] = `Bearer ${currentUser.accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

//------------------------------------------------------------------------------
// ● Response-Data
//------------------------------------------------------------------------------
import router from "../router/";
client.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      store.commit("logout");
      router
        .replace({ name: "Login", query: { ref: router.history.current.name } })
        .catch(() => null);
    }
    throw error;
  }
);

//------------------------------------------------------------------------------
// ● Database-API-Client
//------------------------------------------------------------------------------
function dbApiClient(collectionName) {
  return {
    async read(params) {
      return await client.get(collectionName, { params });
    },
    async create(data) {
      return await client.post(collectionName, data);
    },
    async update(id, data, { partial = true } = {}) {
      return partial
        ? await client.patch(`${collectionName}/${id}`, data)
        : await client.put(collectionName, data);
    },
    async delete(id) {
      return await client.delete(`${collectionName}/${id}`);
    }
  };
}

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
export default dbApiClient;
