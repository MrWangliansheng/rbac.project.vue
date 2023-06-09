import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/User/UserLog.vue";

import { GetRolePower } from "@/api/role";
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
      //#region 注释
      // {
      //   path: '/UserList',
      //   name: '/userlist',
      //   component: () => import("../views/User/UserList.vue"),
      // },
      // {
      //   path: '/RoleList',
      //   name: '/RoleList',
      //   component: () => import("../views/Role/RoleList.vue"),
      // },
      // {
      //   path: '/PowerList',
      //   name: '/PowerList',
      //   component: () => import("../views/Power/PowerList.vue"),
      // }
      //#endregion
    ],
  },
];

const router = new VueRouter({
  routes
});
let state = false;
const whitelist = ["/"];
router.beforeEach((to, from, next) => {

  console.log(router.options.routes.filter(m => to.path != m))
  if (Vue.ls.get("token")) {
    if (to.path === "/") {
      next("/index");
    } else {
      if (!state) {
        state = true;
        GetRolePower().then(d => {
          d.data.forEach(item => {
            item.children.forEach(item1 => {
              console.log(item1.powerRedirect)
              debugger
              router.addRoute('Index', {
                path: item1.powerRoute,
                name: item1.routeName,
                component: () => import(`../views/${item1.powerRedirect}/${item1.routeName}.vue`),
              })
            })
          })
          debugger
          router.addRoute('Index', {
            path: "/404",
            name: "404",
            component: () => import(`../views/Global/404.vue`),
            hidden: true
          })
          next({ ...to, replace: true })
        })
      }
      var index = router.options.routes.filter(m => m.name == "Index")[0].children;
      console.log(to.name);
      if (to.name == undefined) {
        next("/404")
      } else
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
