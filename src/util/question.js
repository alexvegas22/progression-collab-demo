const axios = require('axios');

const get_ebauche = (categorie, nom, titre, langage) => new Promise ((resolve, reject) => {
    axios({url: 'https://fb21cf46-76f2-4f2c-ae0d-2d2aa69baf67.mock.pstmn.io/question/{0}/{1}/{2}/solution?langage={3}'.format(categorie, nom, titre, langage), method: 'GET' })
        .then(resp => {

            resolve(resp.data.Solution.code)
        })
         .catch(err => {
             reject(err)
         })
 })
export default get_ebauche;

// Formatage
String.prototype.format = function() {
    let formatted = this;

    for(let arg in arguments)
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);

    return formatted;
};
