import  { getData } from './request_services'
const BASE_URL = process.env.VUE_APP_API_URL // json-server

// TODO : Vérifier si on laisse le catch ici (s'il est utile) puisqu'on le placera dans Actions.js aussi
const getQuestion = function () {
    return getData(BASE_URL).then(
        data => { return data }
    ).catch((err) => {
        reject(err);
    });
}

const getDataFromApi = function (questionAvancement) {
    return getData(BASE_URL + questionAvancement).then(
        data => { return data }
    ).catch((err) => {
        reject(err);
    });
}



export { getQuestion, getDataFromApi }