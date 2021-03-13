import { createStore } from 'vuex'
import { mutations } from './mutations'
import actions from './actions'

export default createStore({
    state: {
      avancement: "",
      tentative: "",
      // lien avancement set ici en attente de le recuperer de composant question
      lienAvancement :'/user/jdoe/categorie_toto/question/1',
    },
    actions,
    mutations,
  })
  