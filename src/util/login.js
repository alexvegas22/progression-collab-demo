const axios = require('axios');

const login_get_token = ( user,password ) => new Promise ((resolve, reject) => {
    axios({url: 'http://localhost:5002/auth_token', auth: {username: user, password: password}, method: 'GET' })
        .then(resp => {
            const token = resp.data.auth_token
            localStorage.setItem('user-token', token)
            resolve(resp)
        })
        .catch(err => {
            localStorage.removeItem('user-token')
            reject(err)
        })
})

export default login_get_token;
