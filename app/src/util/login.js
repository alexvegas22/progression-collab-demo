const axios = require('axios');

const login_get_token = (user, password) => new Promise((resolve, reject) => {
    axios.post(process.env.VUE_APP_API_URL + '/auth', { username: user, password: password })
        .then(resp => {
            const token = resp.data.Token
            localStorage.setItem('user-token', token)
            resolve(resp)
        })
        .catch(err => {
            localStorage.removeItem('user-token')
            reject(err)
        })
})

export default login_get_token;
