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
    <template v-slot:rightContentRender>
      <RightContent :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { mapState } from "vuex";
import { SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from "@/store/mutation-types";
import { SettingDrawer } from "@ant-design-vue/pro-layout";
import defaultSettings from "@/config/default-settings";
import LogoSvg from "../assets/logo.svg?inline";
export default {
  name: "BasicLayout",
  components: {
    SettingDrawer,
    LogoSvg,
    RightContent: () => import("./components/RightContent")
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
  computed: {
    ...mapState({
      mainMenu: state => state.permission.additionalRouters
    })
  },
  created() {
    const routes = this.mainMenu.find(item => item.path === "/");
    this.menus = (routes && routes.children) || [];
    this.$watch("collapsed", () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed);
    });
    this.$watch("isMobile", () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile);
    });
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
<style lang="less">
@import "./BasicLayout.less";
</style>
