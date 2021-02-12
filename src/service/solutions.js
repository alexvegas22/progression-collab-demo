const axios = require('axios')

const get_solutions_user = (question)=> new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    axios.get('http://localhost:3000/avancement/'+question)
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
export default get_solutions_user

