import Vue from "vue";
import Router from "vue-router";

import Mine from "./views/mine/mine.vue";
import Home from "./views/home/home.vue";
import Main from "./views/main/main.vue";

Vue.use(Router);

Router.prototype.go = function (a) {
  sessionStorage.isBack = true;
  if (a) {
    window.history.go(a);
  } else {
    window.history.go(-1);
  }
};
window.addEventListener(
  "popstate",
  function () {
    sessionStorage.isBack = true;
  },
  false
);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [{
    path: "/",
    name: "Main",
    component: Main,
    redirect: "Home",
    children: [{
        path: "/Mine",
        name: "Mine",
        component: Mine,
        meta: {
          index: 2,
          level: 1
        }
      },
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
          index: 1,
          level: 1
        }
      }
    ]
  }]
});
