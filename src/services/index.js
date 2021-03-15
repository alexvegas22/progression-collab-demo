import request_service, { getData } from './request_services'
const BASE_URL = process.env.VUE_APP_API_URL_QUESTION // json-server
const URL_MOCK = process.env.VUE_APP_API_URL

// TODO : Vérifier si on laisse le catch ici (s'il est utile) puisqu'on le placera dans Actions.js aussi
const getQuestion = function () {
    return getData(BASE_URL).then(
        data => { return data }
    ).catch((err) => {
        reject(err);
    });
}

const getTestsAPI = (urlTests)=>{
    return getData(urlTests).then(
        data => { return data }
    ).catch((err) => {
        reject(err);
    });
}
export { getQuestion, getTestsAPI }