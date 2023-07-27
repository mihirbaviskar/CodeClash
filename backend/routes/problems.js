const express = require('express');
const Problem = require('../models/problemModel');
const router = express.Router();
const {
    getAllProblems,
    getProblemRoute,
    getRandDiffProblem,
    postProblem,
    postSubmission,
    deleteProblem
} = require('../controllers/problemController');
router.get('/', getAllProblems);
router.get('/:id', getProblemRoute);
router.get('/random/:diff', getRandDiffProblem);
router.post('/', postProblem);
router.post('/submit', postSubmission);
router.delete('/:id', deleteProblem)

module.exports = router;