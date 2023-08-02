const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required:true
    },
    room_name:{
        type: String,
        required: true,
    },
    current_problem:{
        type: Number,
        required:true
    },
    score:{
        type: Number,
        required:true
    },
    socket_id:{
        type: String,
        required:true,
        unique:true
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 10800
    }
});

module.exports = mongoose.model('User', userSchema);