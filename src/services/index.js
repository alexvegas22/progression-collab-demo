import { getData, postData } from "@/services/request_services";

const BASE_URL = process.env.VUE_APP_API_URL_QUESTION;
const URL_VALIDER_TENTATIVE = process.env.VUE_APP_API_URL_VALIDATION_TENTATIVE

// Cette méthode va chercher les données de la question et les traiter pour créer des objets dont on aura besoin dans l'appli
// Le serveur retourne question avec les tests et les ébauches incluses dans l'objet question «question.tests» | question.ebauches
// On va donc créer ici un objet question avec un tableau de tests un tableau d'ébauches
const getQuestionApi = async () => {
    try {
        const data = await getData(BASE_URL);
        return data;
    } catch (err) {
        console.log(err);
    }
}
const getTestsAPI = async (urlTests) => {
    try {
        const data = await getData(urlTests);
        return data;
    } catch (err) {
        console.log(err);
    }
}
const getAvancementAPI = async (urlAvancement) => {
    try {
        const avancement = await getData(urlAvancement);
        return avancement.data;
    } catch (err) {
        console.log(err);
    }
}
const getEbaucheApi = async (urlEbauche) => {
    try {
        const ebauche = await getData(urlEbauche);
        return ebauche.data;
    } catch (err) {
        console.log(err);
    }
}
const getTentativeApi = async (urlTentative) => {
    try {
        const tentative = await getData(urlTentative);
        const resultatsId = tentative.data.résultats;
        let resultats = [];
        for (const resultat of resultatsId) {
            resultats.push(await getData(tentative.data.lienResultat + resultat.id));
        }

        const tentativeComplete = { 
            tentative: tentative, 
            resultats: resultats 
        }
        return tentativeComplete;
    } catch (err) {
        console.log(err);
    }
}
const postTentative = async (unLangage, unCode) => {
    try {
        return await postData(URL_VALIDER_TENTATIVE, { langage: unLangage, code: unCode })
    } catch (err) {
        console.log(err);
    }
}

export { getQuestionApi, getTestsAPI, getAvancementAPI, getEbaucheApi, getTentativeApi, postTentative };


