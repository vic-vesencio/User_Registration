const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//User model
const User = require('../../models/User');

//@route GET users
//@desc Get All users
router.get('/', (req, res) => {
	User.find()
		.sort({ date: 1})
        .then(users => res.json(users));
});

//@route POST user
//@desc create new user
router.post('/', async(req, res) => {
	const newUser = new User({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		middleName: req.body.middleName,
		email: req.body.email
	});

	User.findOne({username: newUser.username}, function(user){
		if (user) {
			return res.json({msg:"user name taken", success: false});
		}
	})
	User.findOne({email: newUser.email}, function(user){
		if (user) {
			return res.json({msg:"email is already in use", success: false});
		}
	})

	bcrypt.hash(newUser.password, 10, (err, hash) => {
		newUser.password = hash;
		newUser.save((err, doc) => {
			if(!err) {
				return res.json({newUser, msg: "register complete", success: true});
			} else {
				if (err.name === 'MongoError' && err.code === 11000) {
					res.json({err, msg: "username is already in use", success: false})
				} else {
					res.json({err, msg: "Unknown error", success: false})
				}
			}
		})
	})
})

//@route DELETE user:id
//@desc delete user
router.delete('/:id', (req, res) => {
	User.findById(req.params.id)
		.then(users => users.remove().then(() => res.json( {success: true, msg: 'user deleted' })))
		.catch(err => res.status(404).json({ success: false, msg: 'user not deleted', err }));
});

//@route UPDATE user.password:id
//@update user password
router.post('/update/change-password', (req, res) => {
	const {username} = req.body;
	User.findOne({ username })
	.then(users =>{
		bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
			users.password = hash;
			users.save(err => {
				if (!err) {
					res.json({msg:'password changed', success:true});
				}else {
					res.json({msg:'update not possible', success:false,err});
				}
			})
		})
	})
})

//@route UPDATE user:id
//@desc update user
router.post('/update/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if(req.body.username){
				user.username = req.body.username;
			}
			if(req.body.firstName){
				user.firstName = req.body.firstName;
			}
			if(req.body.lastName){
				user.lastName = req.body.lastName;
			}
			if(req.body.middleName){
				user.middleName = req.body.middleName;
			}
			if(req.body.email){
				user.email = req.body.email;
			}
			if(req.body.group){
				user.group = req.body.group;
			}
			user.save().then(() => {
				res.json({ msg: "update success", success: true, res });
			}).catch(err => res.json({ success: false, err }));;
		})
		.catch(err => {
			if (err.name === 'MongoError' && err.code === 11000) {
				res.json({err, msg: "email/username is already in use", success:false})
			} else {
				res.json({err, msg: "error", success: false})
			}
		});
});

module.exports = router;
