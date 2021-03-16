import common from "./common.i18n";
import proLayoutSetting from "./pro-layout-setting.i18n";
import layouts from "./layouts.i18n";
import admin from "./modules/admin";
import apps from "./modules/apps";
import dash from "./modules/dash";

export default {
  _: common,
  layouts,
  ...proLayoutSetting,
  ...admin,
  ...apps,
  ...dash
};
