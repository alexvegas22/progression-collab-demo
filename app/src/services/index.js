import { getData, postData } from "@/services/request_services";

const BASE_URL = process.env.VUE_APP_API_URL;

const getQuestionApi = async (urlQuestion) => {
    const question = {
        énoncé: null,
        titre: null,
        tests: [],
        ebauches: [],
        liens: []
    }
    try {
        const data = await getData(BASE_URL + "/question/" + urlQuestion + "?include=tests,ebauches");
        question.énoncé = data.data.attributes.énoncé;
        question.titre = data.data.attributes.titre;
        question.liens = [data.data.links];
        data.included.forEach((item) => {
            if (item.type == "test")
                question.tests.push(item.attributes);
            if (item.type == "ebauche")
                question.ebauches[item.attributes.langage] = item.attributes;

        });
        return question;
    } catch (err) {
        console.log(err);
    }
}

const getAvancementApi = async (username, urlQuestion) => {
    const avancement = {
        état: false,
        tentatives: []
    }
    try {
        const data = await getData(BASE_URL + "/avancement/" + username + "/" + urlQuestion + "?include=tentatives");
        avancement.état = data.data.attributes.état;
        if (data.included) {
            data.included.forEach((item) => {
                var tentative = {};
                tentative = item.attributes;
                tentative.liens = item.links;
                avancement.tentatives.push(tentative);
            });
        }
        return avancement;
    } catch (err) {
        console.log(err);
    }
}

const getTentativeApi = async (urlTentative) => {
    try {
        const tentative = await getData(urlTentative);

        const tentativeComplete = {
            tentative: tentative.data.attributes,
            resultats: []
        }
        return tentativeComplete;
    } catch (err) {
        console.log(err);
    }
}
const postTentative = async (params) => {
    try {
        const body = { langage: params.langage, code: params.code }
        const urlRequete = BASE_URL + "/tentative/" + params.username + "/" + params.uri + "?include=resultats"
        const reponseApi = await postData(urlRequete, body)
        const retroactionTentative = {
            feedback_global: "",
            tentative_reussie: false,
            tests_réussis: 0,
            resultats: []
        }
        retroactionTentative.feedback_global = reponseApi.data.attributes.feedback
        retroactionTentative.tentative_reussie = reponseApi.data.attributes.réussi
        retroactionTentative.tests_réussis = reponseApi.data.attributes.tests_réussis
        reponseApi.included.forEach((item) => {
            retroactionTentative.resultats.push(item.attributes);
        });
        return retroactionTentative;
    } catch (err) {
        console.log(err);
    }
}

export { getQuestionApi, getTentativeApi, getAvancementApi, postTentative };


