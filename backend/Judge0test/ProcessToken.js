const axios = require('axios');
require('dotenv').config({path:'../.env'})

const ProcessToken = async (token) =>{
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
        params: {
          base64_encoded: 'false',
          fields: '*'
        },
        headers: {
          'X-RapidAPI-Key': process.env.JUDGE_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log("Error in ProcessToken");
        return error.code;
    }
};

module.exports = ProcessToken;
