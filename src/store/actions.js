import { getTestsAPI } from "../services/index";

export default {
  async getTests({ commit }) {
    try {
      const tests = await getTestsAPI();
      commit("setTests", tests);
    } catch (error) {
      console.log(error);
    }
  },
};
