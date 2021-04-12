import Vue from "vue";
import store from "@/store";

/**
 * 权限指令
 * 用法：
 * 1. 单个权限
 * <a-button v-auth="'admin.user.create'">{{ $t("_.action.new") }}</a-button>
 * 2. 多个权限
 * <a-button v-auth="['admin.user.create', 'admin.user.edit']">{{ $t("_.action.new") }}</a-button>
 */
const auth = Vue.directive("auth", {
  inserted: function(el, binding) {
    if (store.getters.username === "admin") {
      return;
    }
    let permissions = binding.value;
    if (typeof permissions === "string") {
      permissions = [permissions];
    }
    if (permissions.some(val => store.getters.permissions.indexOf(val) === -1)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      } else {
        el.style.display = "none";
      }
    }
  }
});

export default auth;
