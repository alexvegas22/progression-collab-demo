const AXIOS = require('axios');
const ENTRY_POINT = 'http://............../api'

const get_solution = (solutionId) => new Promise ((resolve, reject) => {
	var token = localStorage.getItem('user-token')

	let url = ENTRY_POINT + "/user/test/solution/programmation_1/les_fonctions/appeler_une_fonction/" + solutionId

    AXIOS({url: url ,
		   headers: {'Authorization': `Bearer ${token}`},
		   method: 'GET' })
		.then(resp => {
				resolve(resp.data)
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
		"feedback" : ""
	}

*/