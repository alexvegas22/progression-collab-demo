import {getQuestion} from '../services'
<<<<<<< HEAD
import { getEbaucheApi } from "../services/index";
=======
>>>>>>> dev

export default {
  async getQuestion({commit}, url) {
    try{
      const question = await getQuestion(url);
<<<<<<< HEAD
      commit('setQuestion', await question)
    } catch (error){
      console.log(error)
    }
  },
  async getEbauche({ dispatch, commit }) {
    try {
      await dispatch('getQuestion')

      //state.question

      commit("setEbauche", await getEbaucheApi('http://localhost:3000/QuestionProg/cHJvZzEvbGVzX2ZvbmN0aW9uc18wMS9hcHBlbGVyX3VuZV9mb25jdGlvbl9wYXJhbcOpdHLDqWU=/relationships/ebauche'));
    } catch (error) {
      console.log(error);
    }
  }
}
=======
      commit('setQuestion', question)
    } catch (error){
      console.log(error)
    }
  }
}

>>>>>>> dev
