import { getData, postData } from "@/services/request_services";

const BASE_URL = process.env.VUE_APP_API_URL;

const getQuestionApi = async (urlQuestion) => {
    const question = {
        énoncé: null,
        titre: null,
        tests: [],
        ebauches: [],
        liens
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
        type: 0,
        tentatives: []
    }
    try {
        const data = await getData(BASE_URL + "/avancement/" + username + "/" + urlQuestion + "?include=tentatives");
        avancement.état = data.data.attributes.état;
        avancement.type = data.data.type;
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
            tentative: tentative.data,
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
            tests_réussis: 0,
            feedback_global: "",
            resultats: []
        }
        retroactionTentative.tests_réussis = reponseApi.data.attributes.tests_réussis
        retroactionTentative.feedback_global = reponseApi.data.attributes.feedback
        reponseApi.included.forEach((item) => {
            retroactionTentative.resultats.push(item.attributes);
        });
        return retroactionTentative;
    } catch (err) {
        console.log(err);
    }
}

export { getQuestionApi, getTentativeApi, getAvancementApi, postTentative };


