//==============================================================================
// ■ Routes (routes.js)
//------------------------------------------------------------------------------
//     Routes definitions.
//==============================================================================
import routeGuards from "./guards";

//----------------------------------------------------------------------------
// ● Public-Routes
//----------------------------------------------------------------------------
import Home from "../views/Home";
const home = {
  path: "/",
  name: "Home",
  component: Home
};
//----------------------------------------------------------------------------
const about = {
  path: "/about",
  name: "About",
  component: () => import("../views/About")
};
//----------------------------------------------------------------------------
const profile = {
  path: "/profile/:userName",
  name: "Profile",
  component: () => import("../views/Profile")
};
//----------------------------------------------------------------------------
const login = {
  path: "/login",
  name: "Login",
  component: () => import("../views/Login"),
  beforeEnter: routeGuards.publicOnly
};
//----------------------------------------------------------------------------
const register = {
  path: "/register",
  name: "Register",
  component: () => import("../views/Register"),
  beforeEnter: routeGuards.publicOnly
};

//----------------------------------------------------------------------------
// ● User-Routes
//----------------------------------------------------------------------------
import Settings from "../views/Settings";
const settings = {
  path: "/settings",
  name: "Settings",
  component: Settings,
  beforeEnter: routeGuards.userOnly
};

//----------------------------------------------------------------------------
// ● Admin-Routes
//----------------------------------------------------------------------------
// ...

//----------------------------------------------------------------------------
// ● Default-Route
//----------------------------------------------------------------------------
const any = {
  path: "/*",
  name: "NotFound",
  component: () => import("../views/NotFound")
  // redirect: { name: "NotFound" }
};

//------------------------------------------------------------------------------
// ► Exports
//------------------------------------------------------------------------------
export default [home, about, profile, login, register, settings, any];
