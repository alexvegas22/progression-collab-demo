import { getData, postData } from "@/services/request_services";

const BASE_URL = process.env.VUE_APP_API_URL_QUESTION;
const URL_VALIDER_TENTATIVE = process.env.VUE_APP_API_URL_VALIDATION_TENTATIVE

const getQuestionApi = async () => {
    const question = {
        contenu: null,
        tests: [],
        ebauches: [],
        avancement:null
    }
    try {
        const data = await getData(BASE_URL);
        question.contenu = data.data.attributes
        data.included.forEach( (item) => {
            question.tests.push(item.attributes);
        });
        question.ebauches = await getEbaucheApi(data.data.relationships.ebauches.links.related)
        question.avancement = await getAvancementAPI(data.data.links.avancement)
        return question;
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
        let listeEbauches = []
        const ebauche = await getData(urlEbauche);
        listeEbauches[""+ebauche.data.attributes.langage+""] = ebauche.data.attributes;
        return listeEbauches;
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
            tentative: tentative.data,
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

export { getQuestionApi, getTentativeApi, postTentative };


