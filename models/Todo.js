const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const TodoSchema = new Schema({
   description:{
      type: String,
      required: true
   },
   dateCreated:{
      type: Date,
      default: Date.now,
   }
});

module.exports = Todo = mongoose.model('todo', TodoSchema);