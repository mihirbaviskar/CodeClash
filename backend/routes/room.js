const express = require('express');
const { reqRoomByName, getRoomPopByName } = require('../controllers/roomController');
const router = express.Router();

router.get('/:room_name', reqRoomByName);
router.post('/pop/:room_name', getRoomPopByName);
module.exports = router;