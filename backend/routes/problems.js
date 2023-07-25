const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.json({mssg: 'get all problems'});
});
router.get('/:id', (req,res) => {
    res.json({mssg: 'get single problem'});
});

router.post('/', (req,res) => {
    console.log(req.body);
    res.json({mssg: 'post a new problem'});
});

router.delete('/:id', (req,res) => {
    res.json({mssg: 'delete a problem'})
})

module.exports = router;