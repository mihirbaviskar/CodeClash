const express = require('express');
const { reqRoomByName, getRoomPopByName } = require('../controllers/roomController');
const router = express.Router();

router.get('/:room_name', reqRoomByName);
router.get('/pop/:room_name', getRoomPopByName);
module.exports = router;