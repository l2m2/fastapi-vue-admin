import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins/antd";
import "./plugins/antdpro";
import i18n from "./plugins/i18n";
import themePluginConfig from "../config/themePluginConfig";

import "./global.less";

Vue.config.productionTip = false;

window.umi_plugin_ant_themeVar = themePluginConfig.theme;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
