const plugin = {
  install: (Vue, { store }) => {
    if (!store) {
      throw new Error("Please provide vuex store.");
    }
    Vue.prototype.$auth = function(permissions) {
      if (store.getters.username === "admin") {
        return true;
      }
      return !permissions.some(val => store.getters.permissions.indexOf(val) === -1);
    };
  }
};

export default plugin;
