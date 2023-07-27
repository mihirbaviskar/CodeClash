const ProcessCode = require('./ProcessCode');
const ProcessToken = require('./ProcessToken');
const {decodeBase64} = require('./decode');
const fs = require('fs').promises

async function readTextFile(path) {
    try {
        const code = await fs.readFile(path, 'utf8');
        return code; // This is your text file content
    } catch (err) {
        console.error(err);
    }
}

async function processCodeFromFile() {
    try {
        const code = await readTextFile();
        console.log("Code: ");
        console.log(code);
        const response = await ProcessCode(code);
        console.log(response);
        console.log(response.token);
        return response.token;
    } catch (error) {
        console.error(error);
    }
}

async function processCodeFromInput(inputString) {
    try {
        const code = inputString;
        console.log("Code: ");
        console.log(code);
        const response = await ProcessCode(code);
        console.log(response);
        console.log(response.token);
        return response.token;
    } catch (error) {
        console.error(error);
    }
}

async function pollForResult(token){
    let output = null;
    while(true){
        output = await ProcessToken(token)
        // console.log('*********************************************************************************************************');
        // console.log(output);
        if(output.code === 'ERR_BAD_REQUEST' || (output.status.description !== 'Processing' && output.status.description !== 'In Queue')){
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return output;
}

async function getResultFromFile(){
    try{
        const token = await processCodeFromFile();
        console.log('Token calculated: ' + token);
        const result = await pollForResult(token);
        console.log(result);
        return result;
    }
    catch(error){
        console.log(error);
    }
}
async function getResultFromInput(inputString){
    try{
        const token = await processCodeFromInput(inputString);
        console.log('Token calculated: ' + token);
        const result = await pollForResult(token);
        console.log(result);
        return result;
    }
    catch(error){
        console.log(error);
    }
}


// getResultFromInput(inputString)
// .then(response => {
//     console.log("Hey I got a response: " + response.status.description);
// })
// .catch(error => {
//     console.log(error);
// })



// const token = '1a59e9ec-8d1b-4a4e-9f1b-486f159c9e1a';
// ProcessToken(token)
//     .then(response =>{
//         console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
//         console.log(response);
//         console.log(decodeBase64(response.source_code));
//         console.log(decodeBase64(response.compile_output));
//         console.log(decodeBase64(response.stdout));
//         console.log(decodeBase64(response.stderr));
//     })
//     .catch(error => console.error(error));

module.exports = {
    readTextFile,
    getResultFromInput
}
