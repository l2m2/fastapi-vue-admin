import API from "@/api/index";

const state = {
  token: null,
  avatar: null,
  fullname: ""
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
