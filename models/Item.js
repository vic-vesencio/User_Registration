const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ItemSchema = new Schema({
    QuizId:{
        type: String,
        required: true
    },
    question:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    choices: [],
    dateCreated:{
        type: Date,
		default: Date.now,
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);