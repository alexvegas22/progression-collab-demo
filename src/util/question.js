const axios = require('axios');
const BASE_URL = process.env.VUE_APP_API_URL_QUESTION // json-server

const get_question = () =>
  new Promise((resolve, reject) => {
    axios({ url: BASE_URL, method: "GET" }) // json-server
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default get_question;
