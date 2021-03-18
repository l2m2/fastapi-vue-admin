import login from "./login.api";
import users from "./users.api";
import roles from "./roles.api";
import permissions from "./permissions.api";

const apis = {
  ...login,
  ...users,
  ...roles,
  ...permissions
};
export default apis;
