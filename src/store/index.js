import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";

export default createStore({
  state: {
    tests: [],
    question: {}
  },
  actions,
  mutations,
});

