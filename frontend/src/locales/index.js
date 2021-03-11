import common from "./common";
import setting from "./setting";
import admin from "./modules/admin";
import apps from "./modules/apps";
import dash from "./modules/dash";

export default {
  _: common,
  ...setting,
  ...admin,
  ...apps,
  ...dash
};
