require('dotenv').config({path:'../.env'})

const axios = require('axios');
const ProcessCode = async (code) => {
    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {
          base64_encoded: 'false',
          fields: '*'
        },
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
          language_id: 54,
          source_code: code,
          compiler_options: '-O2 -Wall -Wextra -std=c++17 -fsanitize=address -fmax-errors=10'
        }
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log("Error in ProcessCode");
        return error;
    }
};

module.exports = ProcessCode;