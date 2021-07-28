import * as types from "./mutation-types";

export default {
  [types.SET_BACK](_state, _payload) {
    _state.backEvent = _payload.event;
  },

  [types.GO_BACK](_state) {
    this.commit("app/UPDATE_DIRECTION", {
      direction: "back"
    });
    _state.backEvent();
  }
};