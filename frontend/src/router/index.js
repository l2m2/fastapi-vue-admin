import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/UserLayout")
  },
  {
    path: "/user",
    redirect: "/user/login",
    component: () => import("@/layouts/UserLayout"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/login/Login")
      }
    ]
  },
  {
    path: "/admin",
    component: () => import("@/layouts/BasicLayout"),
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("@/views/admin/user/User")
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/admin/role/Role")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
