import { getQuestion, getTestsAPI } from "../services";

export default {
  async getQuestion({ dispatch, commit }, url) {
    const question = await getQuestion(url);
    commit("setQuestion", question.data);
    commit("setTests", question.included);
  },
};
