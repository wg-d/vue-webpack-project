import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import promise from 'es6-promise'
import http from "./utils/http";
import db from "./utils/indexedDB";
import i18n from "./assets/i18n"
import "./utils/extension";
import "mint-ui/lib/style.css";
import $ from 'jquery'
import vueLazy from 'vue-lazyload'

import {
  Tabbar,
  TabItem
} from "mint-ui";
import toast from "./pluging/toast/toast";

promise.polyfill()
Vue.use(toast);

Vue.component("mt-tabbar", Tabbar);
Vue.component("mt-tab-item", TabItem);

Vue.use(vueLazy, {
  preLoad: 1,
  // error: './assets/error.png',
  loading: require('./assets/imgs/loading.gif'),
  attempt: 1
})

Vue.config.productionTip = false;

Vue.prototype.$http = http;
Vue.prototype.$db = db;
Vue.prototype.$i18n = i18n;
Vue.prototype.$ = $;

import directives from "./assets/directives/touch";
directives(Vue);

Vue.config.productionTip = false;
const history = window.sessionStorage;
let historyCount = history.getItem("count") * 1;
router.beforeEach(function (to, from, next) {
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (
      !fromIndex ||
      parseInt(toIndex, 10) > parseInt(fromIndex, 10) ||
      (toIndex === "0" && fromIndex === "0")
    ) {
      store.commit("app/" + "UPDATE_DIRECTION", {
        direction: "forward"
      });
    } else {
      store.commit("app/" + "UPDATE_DIRECTION", {
        direction: "reverse"
      });
    }
  } else {
    ++historyCount;
    history.setItem("count", historyCount);
    to.path !== "/" && history.setItem(to.path, historyCount);
    store.commit("app/" + "UPDATE_DIRECTION", {
      direction: "forward"
    });
  }
  if (/\/http/.test(to.path)) {
    let url = to.path.split("http")[1];
    window.location.href = `http${url}`;
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");