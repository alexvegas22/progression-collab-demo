const axios = require('axios')

const get_solutions_user = (question)=> new Promise((resolve, reject)=> {
    //let token = localStorage.getItem('user-token')
    axios.get('https://8acdbddd-1b5d-468f-91ac-fe46027b62e0.mock.pstmn.io/user/'+question)
        .then(res=>{
            resolve(res.data)
        })
        .catch(error=>{
            reject(error)
        })
    })
export default get_solutions_user

