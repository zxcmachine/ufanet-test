import authCheck from "./middlewares/accept";
import reauthCheck from "./middlewares/reacept";
import isAdminMiddleware from "./middlewares/checkRole";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: authCheck,
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/auth",
    beforeEnter: reauthCheck,
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Auth/AuthIndex.vue") },
    ],
  },
  {
    path: "/users",
    beforeEnter: [isAdminMiddleware, authCheck],
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/User/UserList.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
