import common from "./common";
import app from "./app";
import admin from "./module/admin";
import apps from "./module/apps";
import dash from "./module/dash";

export default {
  _: common,
  app,
  ...admin,
  ...apps,
  ...dash
};
