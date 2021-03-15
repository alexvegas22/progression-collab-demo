import { getQuestion, getTestsAPI } from "../services";

export default {
  async getQuestion({ dispatch, commit }, url) {
    const question = await getQuestion(url);
    commit("setQuestion", question);
    await dispatch("getTests");
  },
  async getTests({ commit, state }) {
    const testsURL = state.question.relationships.tests.links.related
    const tests = await getTestsAPI(testsURL);
    commit("setTests", tests);
  },
};
