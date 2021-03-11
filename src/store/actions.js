import { getEbaucheApi } from "../services/index";

export default {
  async getEbauche({ commit }, urlEbauche) {
    try {
      const ebauche = await getEbaucheApi(urlEbauche);
      commit("setEbauche", ebauche);
    } catch (error) {
      console.log(error);
    }
  },
};
