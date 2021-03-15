

// TODO : Vérifier si on laisse le catch ici (s'il est utile) puisqu'on le placera dans Actions.js aussi
// TODO : Changer le nom 'getQuestion' pour 'getQuestionApi' afin de standardiser le code.
const getQuestion = () => {
  return getData(BASE_URL)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      reject(err);
    });
};


const getDataFromApi = function (questionAvancement) {
    return getData(BASE_URL + questionAvancement).then(
        data => { return data }
    ).catch((err) => {
        reject(err);
    });
}




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

export { getQuestion, getEbaucheApi, getDataFromApi };

