import  { getData, postData } from "./request_services";
const BASE_URL = process.env.VUE_APP_API_URL_QUESTION; // json-server
const URL_VALIDER_TENTATIVE=process.env.VUE_APP_API_URL_VALIDATION_TENTATIVE
const URL_MOCK = process.env.VUE_APP_API_URL


// TODO : Vérifier si on laisse le catch ici (s'il est utile) puisqu'on le placera dans Actions.js aussi
// TODO : Changer le nom 'getQuestion' pour 'getQuestionApi' afin de standardiser le code.
const getQuestionAPI = () => {
		return getData(BASE_URL)
			.then((data) => {
            return créerObjetsQuestion(data);
        })
        .catch((err) => {
            reject(err);
        });
}

const créerObjetsQuestion = (data) => {
	var question = data.data.attributes;
	var tests = [];
	var ebauches = [];
	data.included.forEach( (item,index) => {
		if(item.type == "test") tests.push(item.attributes);
		if(item.type == "ebauche") ebauches.push(item.attributes);
	});

	return { "question" : question,
			 "tests" : tests,
			 "ebauches" : ebauches };
}

const getTestsAPI = (urlTests)=>{
    return getData(urlTests).then(
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

const postTentative = async function (unLangage, unCode) {
    return await postData(URL_VALIDER_TENTATIVE, {langage: unLangage, code: unCode })
}
export { getQuestionAPI, getEbaucheApi, postTentative, getTestsAPI };


