const AXIOS = require('axios');
const ENTRY_POINT = 'http://localhost:3000'

const get_solution = (solutionId) => new Promise ((resolve, reject) => {

    // url pattern is based on api doc example
    let url = ENTRY_POINT + "/solutions/" + solutionId

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
