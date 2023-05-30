import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/User/UserLog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "UserLog",
    component: HomeView,
  },
  {
    path: "/Index",
    name: "Index",
    component: () => import("../views/Global/Index.vue"),
    children: [
      {
        path: '/UserList',
        name: '/userlist',
        component: () => import("../views/User/UserList.vue"),
      },
      {
        path: '/RoleList',
        name: '/RoleList',
        component: () => import("../views/Role/RoleList.vue"),
      },
      {
        path: '/PowerList',
        name: '/PowerList',
        component: () => import("../views/Power/PowerList.vue"),
      }
    ],
  },

];

const router = new VueRouter({
  routes
});
const whitelist = ["/"];
router.beforeEach((to, from, next) => {
  if (Vue.ls.get("token")) {
    if (to.path === "/") {
      next("/index");
    } else {
      next();
    }
  } else {
    if (whitelist.includes(to.path)) {
      next();
    } else {
      next("/");
    }
  }
})
export default router;
