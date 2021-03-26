import { getData, postData } from "@/services/request_services";

const BASE_URL = process.env.VUE_APP_API_URL_QUESTION;
const URL_VALIDER_TENTATIVE = process.env.VUE_APP_API_URL_VALIDATION_TENTATIVE

const getQuestionApi = async () => {
    const question = {
        contenu: null,
        tests: [],
        ebauches: []
    }
    try {
        const data = await getData(BASE_URL);
        question.contenu = data.data.attributes
        data.included.forEach( (item) => {
            question.tests.push(item.attributes);
            /*if(item.type == "test") question.tests.push(item.attributes);
            if(item.type == "ebauche") question.ebauches.push(item.attributes);*/
        });
        question.ebauches[0] = await getEbaucheApi(data.data.relationships.ebauches.links.related)
        return question;
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
        return ebauche.data.attributes;
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


