const express = require('express');
const Problem = require('../models/problemModel');
const router = express.Router();
const {
    getAllProblems,
    getProblemRoute,
    postProblem,
    postSubmission,
    deleteProblem
} = require('../controllers/problemController');
router.get('/', getAllProblems);
router.get('/:id', getProblemRoute);
router.post('/', postProblem);
router.post('/:id', postSubmission);
router.delete('/:id', deleteProblem)

module.exports = router;