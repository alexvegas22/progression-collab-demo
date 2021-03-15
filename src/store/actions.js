import { getQuestion, getTestsAPI } from "../services";

export default {
  async getQuestion({ dispatch, commit }, url) {
    const question = await getQuestion(url);
    commit("setQuestion", question);
    await dispatch("getQuestion");
  },
  async getTests({ commit }) {
    const tests = await getTestsAPI();
    commit("setTests", tests);
  },
};
