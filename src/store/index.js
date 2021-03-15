import { createStore } from "vuex";
import { mutations } from "./mutations";
import actions from "./actions";

export default createStore({
  state: {
<<<<<<< HEAD
    question: {},
    ebauche: {},
=======
    ebauche: Promise,
>>>>>>> 821f0f161239466d66227a64e807fdda6a11daba
  },
  actions,
  mutations,
});
