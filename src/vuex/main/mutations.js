import * as types from "./mutation-types";

export default {
  [types.UPDATE_DIRECTION](state, _payload) {
    state.direction = _payload.direction;
  }
};