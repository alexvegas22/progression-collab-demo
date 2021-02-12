const AXIOS = require('axios');
const ENTRY_POINT = 'https://8acdbddd-1b5d-468f-91ac-fe46027b62e0.mock.pstmn.io'

const get_solution = (solutionId) => new Promise ((resolve, reject) => {

	// url pattern is based on api doc example
	let url = ENTRY_POINT + "/user/test/solution/programmation_1/les_fonctions/appeler_une_fonction/" + solutionId

    AXIOS({url: url ,
		   method: 'GET' })
		.then(response => {
			resolve(response.data)
		})
        .catch(err => {
            reject(err)
        })
})

export default get_solution;



/* 
json returned

	{
		"date_soumission" : "1223345",
		"langage" : "1",
		"code" : "Print(\"hello world\")",
		"feedback" : "Commentaire sur le code"
	}

*/