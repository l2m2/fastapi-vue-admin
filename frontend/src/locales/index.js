import common from "./common.i18n";
import proLayoutSetting from "./pro-layout-setting.i18n";
import layouts from "./layouts.i18n";
import menu from "./menu.i18n";
import permissions from "./permissions.i18n";
import login from "./login.i18n";
import account from "./account.i18n";
import admin from "./modules/admin";
import apps from "./modules/apps";
import dash from "./modules/dash";

export default {
  _: common,
  layouts,
  menu,
  permissions,
  ...proLayoutSetting,
  login,
  account,
  ...admin,
  ...apps,
  ...dash
};
