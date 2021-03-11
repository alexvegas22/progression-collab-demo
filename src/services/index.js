import { getData, postData } from './request_services'
const BASE_URL = process.env.VUE_APP_API_URL // json-server
const URL_VALIDER_TENTATIVE=process.env.VUE_APP_API_URL_VALIDATION_TENTATIVE

// TODO : Vérifier si on laisse le catch ici (s'il est utile) puisqu'on le placera dans Actions.js aussi
const getQuestion = function () {
    return getData(BASE_URL).then(
        data => { return data }
    ).catch((err) => {
        reject(err);
    });
}

const postTentative = function (unLangage, unCode) {
    return postData(URL_VALIDER_TENTATIVE, {langage: unLangage, code: unCode }).then(
        data => { return data }
    ).catch((err) => {
        reject(err);
    });
}
export { getQuestion, postTentative }