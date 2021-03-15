import request_service, { getData } from "./request_services";
const BASE_URL = process.env.VUE_APP_API_URL_QUESTION; // json-server

// TODO : Vérifier si on laisse le catch ici (s'il est utile) puisqu'on le placera dans Actions.js aussi
// TODO : Changer le nom 'getQuestion' pour 'getQuestionApi' afin de standardiser le code.
const getQuestion = () => {
  return getData(BASE_URL)
    .then((data) => {
      return data;
    })
    .catch((err) => {
<<<<<<< HEAD
      console.log(err)
=======
>>>>>>> 821f0f161239466d66227a64e807fdda6a11daba
      reject(err);
    });
};

// TODO : Vérifier si on laisse le catch ici (s'il est utile) puisqu'on le placera dans Actions.js aussi
const getEbaucheApi = (urlEbauche) => {
  return getData(urlEbauche)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      reject(err);
    });
};

export { getQuestion, getEbaucheApi };
