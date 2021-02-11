const axios = require('axios');

const URLRetro = 'https://fb21cf46-76f2-4f2c-ae0d-2d2aa69baf67.mock.pstmn.io/retroaction';

const solution = 1;
const test = 2;

const fetchapi =( user,password ) => new Promise ((resolve, reject) => {
    axios
      .get('https://fb21cf46-76f2-4f2c-ae0d-2d2aa69baf67.mock.pstmn.io/retroaction')
      .then(response => {
        this.solution = response.data
        //.Solution
        //this.test = response.data.Test
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    })

   export default fetchapi;
