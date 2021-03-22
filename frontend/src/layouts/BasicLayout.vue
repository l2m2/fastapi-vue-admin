<template>
  <pro-layout
    :collapsed="collapsed"
    :menus="menus"
    :isMobile="isMobile"
    :mediaQuery="query"
    :handleCollapse="handleCollapse"
    :handleMediaQuery="handleMediaQuery"
    v-bind="settings"
    :i18nRender="i18nRender"
  >
    <template v-slot:menuHeaderRender>
      <div>
        <logo-svg />
        <h1>{{ $t("_.app.name") }}</h1>
      </div>
    </template>
    <setting-drawer v-if="!isProduction" :settings="settings" @change="handleSettingChange"> </setting-drawer>
    <router-view />
  </pro-layout>
</template>

<script>
import { SettingDrawer } from "@ant-design-vue/pro-layout";
import defaultSettings from "@/config/default-settings";
import LogoSvg from "../assets/logo.svg?inline";
export default {
  name: "BasicLayout",
  components: {
    SettingDrawer,
    LogoSvg
  },
  data() {
    return {
      isProduction: process.env.NODE_ENV === "production",
      collapsed: false,
      menus: [],
      settings: {
        layout: defaultSettings.layout,
        contentWidth: defaultSettings.layout === "sidemenu" ? "Fluid" : defaultSettings.contentWidth,
        theme: defaultSettings.navTheme,
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,
        hideHintAlert: false,
        hideCopyButton: false
      },
      query: {},
      isMobile: false
    };
  },
  methods: {
    i18nRender(val) {
      return this.$t(val);
    },
    handleCollapse(val) {
      this.collapsed = val;
    },
    handleMediaQuery(query) {
      this.query = query;
      if (this.isMobile && !query["screen-xs"]) {
        this.isMobile = false;
        return;
      }
      if (!this.isMobile && query["screen-xs"]) {
        this.isMobile = true;
        this.collapsed = false;
        this.settings.contentWidth = "Fluid";
      }
    },
    handleSettingChange({ type, value }) {
      type && (this.settings[type] = value);
      switch (type) {
        case "contentWidth":
          this.settings[type] = value;
          break;
        case "layout":
          if (value === "sidemenu") {
            this.settings.contentWidth = "Fluid";
          } else {
            this.settings.fixSiderbar = false;
            this.settings.contentWidth = "Fixed";
          }
          break;
      }
    }
  }
};
</script>

<style></style>
