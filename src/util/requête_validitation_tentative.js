const AXIOS = require('axios');
const ENTRY_POINT = 'https://8acdbddd-1b5d-468f-91ac-fe46027b62e0.mock.pstmn.io'

const post_valider_tentative = (reponse_a_valider) => new Promise ((resolve, reject) => {

    // url pattern is based on api doc example
    let url = ENTRY_POINT + "/api/v1/user/test/question/programmation_1/les_fonctions/appeler_une_fonction/avancement/solutions?langage="+reponse_a_valider.language

    AXIOS({url: url ,
        method: 'POST',
        data: {code: reponse_a_valider}
        })
        .then(response => {
            resolve(response.data)
        })
        .catch(err => {
            reject(err)
        })
})

export default post_valider_tentative;