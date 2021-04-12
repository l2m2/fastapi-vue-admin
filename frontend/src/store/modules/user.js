import API from "@/api/index";

const state = {
  token: null,
  username: "",
  fullname: "",
  permissions: [],
  info: {}
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USERNAME: (state, username) => {
    state.username = username;
  },
  SET_FULLNAME: (state, fullname) => {
    state.fullname = fullname;
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  }
};

const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.login
        .loginAccessToken(data)
        .then(response => {
          commit("SET_TOKEN", response.access_token);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      API.users
        .readUserMe()
        .then(response => {
          commit("SET_FULLNAME", response.fullname);
          commit("SET_USERNAME", response.username);
          commit("SET_PERMISSIONS", response.permissions);
          commit("SET_INFO", response);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    commit("SET_USERNAME", "");
    commit("SET_FULLNAME", "");
    commit("SET_PERMISSIONS", []);
    commit("SET_INFO", {});
    commit("SET_TOKEN", null);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
