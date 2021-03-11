import {postTentative} from '../services/index.js'

export default {
    async envoyerTentative({commit}, langage, code) {
        try {
            var retroaction;
            //const retroactionTentative = await postTentative({langage}, {code});
            await postTentative({langage}, {code}).then(reponseAPI => {
                //si on recoit une reponse le message devient null, la reponse sera affichee
                retroaction=reponseAPI
                commit('updateRetroaction', retroaction)
                }
            ).catch(
                err => {
                    console.log(err);
                    //message d'erreur si on ne peut pas joindre l'API
                    //TODO, gerer le message d'erreur
                    this.message_connexion_API="Impossible de communiquer avec le super serveur de validation :("
                }
            )

        } catch (error) {
            console.log(error)
        }
    }
}