const mongoose = require('mongoose');
const Schema = mongoose.Schema

const problemSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    diff:{
        type:String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    desc:{
        type:String,
        required:true
    },
    testcases:{
        type:String,
        required:true
    },
    examples:{
        type: [String],
        required: true
    }
}, {timestamps: true })

module.exports = mongoose.model('Problem', problemSchema)