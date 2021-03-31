import Vue from "vue";
import { Icon } from "ant-design-vue";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2456846_rs0079tzph.js"
});

Vue.component("icon-font", IconFont);
