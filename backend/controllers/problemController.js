const Problem = require('../models/problemModel');
const mongoose = require('mongoose');
const {
    readTextFile,
    getResultFromInput
} = require('../Judge0/Result')

let header;
(async () =>{
    header = await readTextFile('/Users/rasikapawar/Documents/Projects/MonacoTest/LCRacerTest/backend/Judge0/header_file.txt');
    console.log("header has been read");
    console.log(header);
})();

// get all problems
const getAllProblems = async (req, res) => {
    try{
        const problems = await Problem.find({});
        res.status(200).json(problems);
    }
    catch(error){
        res.status(404).json({error: error.message});
    }
}
// get specific problem given id
const getProblemRoute = async (req, res) => {
    const {id} = req.params;
    try{
        const problem = await getProblem(id);
        res.status(200).json(problem);
    }
    catch(error){
        res.status(404).json({error: error.message});
    }
}
const getProblem = async (id) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error("Invalid id");
        }
        const problem = await Problem.findById(id);
        if(!problem){
            throw new Error("Error no such workout");
        }
        return problem;
    }
    catch(error){
       throw error;
    }
}
// post problem
const postProblem = async(req, res) => {
    console.log("uploading problem");
    const {title, diff, desc, testcases, examples} = req.body;
    try{
        const problem = await Problem.create({title, diff, desc, testcases, examples});
        res.status(200).json(problem);
    } catch(error){
        console.log("Error uploading problem " + error);
        res.status(400).json({error: error.message});
    }
}

const postSubmission = async(req, res) => {
    const {id} = req.params;
    console.log(id);
    console.log("uploading submission");
    const {answer} = req.body;
    console.log(answer);
    try{
        const problem = await getProblem(id);
        const submission = header + answer + problem.testcases;
        console.log(submission);
        const result = await getResultFromInput(submission);
        res.status(200).json(result);
    } catch(error){
        console.log("Error uploading submission " + error);
        res.status(400).json({error: error.message});
    }
}


// delete a problem
const deleteProblem = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id"});
    }
    const problem = await Problem.findByIdAndDelete(id);
    if(!problem){
        return res.status(404).json({error: "Error no such workout"});
    }
    res.status(200).json(problem);
}

module.exports = {
    getAllProblems,
    getProblemRoute,
    postProblem,
    postSubmission,
    deleteProblem
}