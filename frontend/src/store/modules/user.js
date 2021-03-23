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
          commit("SET_INFO", response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
