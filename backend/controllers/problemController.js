const Problem = require('../models/problemModel');
const mongoose = require('mongoose');
const {
    readTextFile,
    getResultFromInput
} = require('../Judge0/Result')
const {decodeBase64, decodeOutput} = require('../Judge0/decode');

let header;
(async () =>{
    header = await readTextFile('/Users/rasikapawar/Documents/Projects/MonacoTest/LCRacerTest/backend/Judge0/header_file.txt');
    console.log("header has been read");
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
            throw new Error("Error no such problem");
        }
        return problem;
    }
    catch(error){
       throw error;
    }
}
const getRandDiffProblem = async (req, res) => {
    const {diff} = req.params;
    try{
        const problems = await Problem.aggregate([
            {$match: {diff: diff}},
            {$sample: {size: 1}}
        ]);
        if (!problems || problems.length === 0) {
            return res.status(404).json({ error: "No rand problem found" });
        }
        res.status(200).json(problems[0]);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}


// post problem
const postProblem = async(req, res) => {
    console.log("uploading problem");
    const {title, diff, desc, testcases, examples, constraints, starter_code} = req.body;
    try{
        const problem = await Problem.create({title, diff, desc, testcases, examples, constraints, starter_code});
        res.status(200).json(problem);
    } catch(error){
        console.log("Error uploading problem " + error);
        res.status(400).json({error: error.message});
    }
}

const postSubmission = async(req, res) => {
    console.log("uploading submission");
    const {_id, code} = req.body;
    console.log(code);
    try{
        const problem = await getProblem(_id);
        const submission = header + "\n" + code + "\n" + problem.testcases;
        console.log(submission);
        const result = await getResultFromInput(submission);
        if (result.stdout) result.stdout = decodeOutput(decodeBase64(result.stdout));
        if (result.stderr) result.stderr = decodeBase64(result.stderr);
        if (result.source_code) result.source_code = decodeBase64(result.source_code);
        if (result.compile_output) result.compile_output = decodeBase64(result.compile_output);
        if (result.message) result.message = decodeBase64(result.message);
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
        return res.status(404).json({error: "Error no such problem"});
    }
    res.status(200).json(problem);
}


const updateProblem = async (req, res) => {
    console.log("patching problem");
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id"});
    }
    const problem = await Problem.findOneAndUpdate({_id:id},{
        ...req.body
    });
    if(!problem){
        return res.status(400).json({error: "No such problem"});
    }
    res.status(200).json(problem);
}



module.exports = {
    getAllProblems,
    getProblemRoute,
    getRandDiffProblem,
    postProblem,
    postSubmission,
    deleteProblem,
    updateProblem
}