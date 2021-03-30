import { difference as _difference } from "lodash-es";
import store from "@/store";
import { basicRouters, dynamicRouters } from "@/config/router.config";

function hasPermission(router, permissions) {
  if (router.meta && router.meta.permission) {
    return _difference(router.meta.permission, permissions);
  }
  return true;
}

function filterRouters(routers, permissions) {
  const accessedRouters = routers.filter(router => {
    if (hasPermission(router, permissions)) {
      if (router.children && router.children.length) {
        router.children = filterRouters(router.children, permissions);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const state = {
  routers: basicRouters,
  additionalRouters: []
};

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.additionalRouters = routers;
    state.routers = basicRouters.concat(routers);
  }
};

const actions = {
  generateRouters({ commit }, data) {
    return new Promise(resolve => {
      const { permissions } = data;
      const accessedRouters = store.getters.username === "admin" ? dynamicRouters : filterRouters(dynamicRouters, permissions);
      commit("SET_ROUTERS", accessedRouters);
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
