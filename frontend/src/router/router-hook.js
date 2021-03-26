import router from "@/router";
import store from "@/store";
import NProgress from "nprogress";
import notification from "ant-design-vue/es/notification";

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
      if (store.getters.permissions.length === 0 && store.getters.username !== "admin") {
        store
          .dispatch("getUserInfo")
          .then(() => {
            // TODO
          })
          .catch(() => {
            notification.error({
              message: "错误",
              description: "请求用户信息失败，请重试"
            });
          });
        store.dispatch("logout").then(() => {
          next({ path: loginRoutePath, query: { redirect: to.fullPath } });
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
