import router from "@/router";
import store from "@/store";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

const allowList = ["login"];
const loginRoutePath = "/user/login";
const defaultRoutePath = "/dashboard";

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.getters.token) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath });
      NProgress.done();
    } else {
      if (store.getters.additionalRouters.length === 0) {
        store
          .dispatch("user/getUserInfo")
          .then(res => {
            const permissions = res.permissions;
            store.dispatch("permission/generateRouters", { permissions }).then(() => {
              store.getters.additionalRouters.forEach(item => {
                router.addRoute(item);
              });
              const redirect = decodeURIComponent(from.query.redirect || to.path);
              if (to.path === redirect) {
                next({ ...to, replace: true });
              } else {
                next({ path: redirect });
              }
            });
          })
          .catch(() => {
            store.dispatch("user/logout").then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } });
            });
          });
      } else {
        next();
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      next();
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } });
      // if current page is login will not trigger afterEach hook, so manually handle it
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
