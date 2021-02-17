const axios = require('axios');

const getEbauche = (categorie, nom, titre, langage) => new Promise ((resolve, reject) => {
    axios({url: '{0}/question/{1}/{2}/{3}/solution?langage={4}'.format(process.env.VUE_APP_API_URL, categorie, nom, titre, langage), method: 'GET' })
        .then(resp => {

            resolve(resp.data.Solution.code)
        })
         .catch(err => {
             reject(err)
         })
 })

export default getEbauche;

// Formatage
String.prototype.format = function() {
    let formatted = this;

    for(let arg in arguments)
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);

    return formatted;
};
