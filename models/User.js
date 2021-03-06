const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	username:{
		type: String,
		required: true,
		unique: true
   },
   password:{
		type: String,
        required: true,
	},
	firstName:{
		type: String,
		required: true,
	},
	lastName:{
		type: String,
		required: true,
	},
	middleName:{
		type: String,
		required: true,
	},
	email:{
		type: String,
		unique: true,
		required: true
	},
	dateCreated:{
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('user', UserSchema);