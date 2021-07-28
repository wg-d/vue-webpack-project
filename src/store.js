import Vue from "vue";
import Vuex from "vuex";
import mainModule from "./vuex/main";
import headerModule from "./vuex/header";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app: mainModule,
    header: headerModule
  }
});