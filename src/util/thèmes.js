const axios = require('axios');

const get_thèmes = () => new Promise ((resolve, reject) => {
	var token = localStorage.getItem('user-token')
    axios({url: 'http://localhost:5002/themes',
		   headers: {'Authorization': `Bearer ${token}`},
		   method: 'GET' })
		.then(resp => {
				resolve(resp.data.thèmes)
			})
         .catch(err => {
             reject(err)
         })
})

export default get_thèmes;
