const express = require('express');
const router = express.Router();
const {
    getAllProblems,
    getProblemRoute,
    getRandDiffProblem,
    postProblem,
    postSubmission,
    deleteProblem,
    updateProblem
} = require('../controllers/problemController');
router.get('/', getAllProblems);
router.get('/:id', getProblemRoute);
router.get('/random/:diff', getRandDiffProblem);
router.post('/', postProblem);
router.post('/submit', postSubmission);
router.delete('/:id', deleteProblem)
router.patch('/:id', updateProblem)
module.exports = router;