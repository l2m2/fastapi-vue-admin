import { UserLayout, BasicLayout } from "@/layouts";

const RouteView = {
  name: "RouteView",
  render: h => h("router-view")
};

/**
 * 基础路由
 */
export const basicRouters = [
  {
    path: "/user",
    component: UserLayout,
    redirect: "/user/login",
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/login/Login")
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/exception/404")
  }
];

/**
 * 动态路由
 */
export const dynamicRouters = [
  {
    path: "/",
    name: "index",
    component: BasicLayout,
    meta: { title: "menu.home" },
    redirect: "/dashboard",
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dash/Dashboard"),
        meta: { title: "menu.dashboard", icon: "dashboard", permission: ["/apps/dashboard/read"] }
      },
      {
        path: "/admin",
        component: RouteView,
        meta: { title: "menu.admin.default", icon: "setting" },
        children: [
          {
            path: "/admin/user",
            name: "user",
            component: () => import("@/views/admin/user/User"),
            meta: { title: "menu.admin.user", permission: ["/admin/user/read"] }
          },
          {
            path: "/admin/role",
            name: "role",
            component: () => import("@/views/admin/role/Role"),
            meta: { title: "menu.admin.role", permission: ["/admin/role/read"] }
          },
          {
            path: "/admin/security-log",
            name: "security-log",
            component: () => import("@/views/admin/security-log/SecurityLog"),
            meta: { title: "menu.admin.security-log", permission: ["/admin/security-log/read"] }
          }
        ]
      }
    ]
  },
  {
    path: "/account",
    name: "account",
    component: BasicLayout,
    children: [
      {
        path: "/account/settings",
        name: "account-settings",
        component: () => import("@/views/account/settings/AccountSettings")
      }
    ]
  },
  {
    path: "*",
    redirect: "/404"
  }
];
