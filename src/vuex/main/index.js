import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  direction: "forward",
  ios_currversion: 8,
  android_currversion: 8
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};