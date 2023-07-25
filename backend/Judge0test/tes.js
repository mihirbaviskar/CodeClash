const ProcessCode = require('./ProcessCode');
const ProcessToken = require('./ProcessToken');
const fs = require('fs').promises

async function readTextFile() {
    try {
        const code = await fs.readFile('../../testscripts/helloWorld.txt', 'utf8');
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
async function pollForResult(token){
    let output = null;
    while(true){
        output = await ProcessToken(token)
        // console.log('*********************************************************************************************************');
        // console.log(output);
        if(output === 'ERR_BAD_REQUEST' || output.status.description !== 'Processing'){
            break;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    return output;
}

async function getResult(){
    try{
        const token = await processCodeFromFile();
        console.log('Token calculated: ' + token);
        const result = await pollForResult(token);
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
}

getResult();

// const token = '0b57c685-d5fd-459a-b313-595fc7772759';



