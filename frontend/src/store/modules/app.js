const state = {
  lang: ""
};

const mutations = {
  SET_LANG: (state, lang) => {
    state.lang = lang;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
