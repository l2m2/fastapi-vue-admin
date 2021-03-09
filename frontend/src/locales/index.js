import common from "./common";
import app from "./app";
import admin from "./modules/admin";
import apps from "./modules/apps";
import dash from "./modules/dash";

export default {
  _: common,
  app,
  ...admin,
  ...apps,
  ...dash
};
