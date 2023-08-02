const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    room_name:{
        type: String,
        required:true,
        unique:true
    },
    num_players:{
        type: Number,
        required:true,
        min: 2,
        max: 4
    },
    diffs:{
        type: [String],
        required:true
    },
    num_problems:{
        type: Number,
        required:true
    },
    user_ids:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    problem_ids:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    room_state:{
        type: String,
        enum: ['waiting', 'in progress', 'finished'],
        required:true
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
        expires: 10800
    }
})

module.exports = mongoose.model('Room', roomSchema);