const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/gamertod_shop', {useNewUrlParser: true}).then(() => {
	console.log('Connected to the database');
});

let user_Schema = new Schema({
	name: String,
	last_name: String,
	email: String,
	gender: String,
	country: String,
	password: String,
	birthday: {
		b_day: String,
		b_month: String,
		b_year: String
	},
	username: String,
	lower_username: String
});

const User = module.exports = mongoose.model('user', user_Schema);

module.exports.saveNewUser = (newUser, callback) => {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			newUser.password = hash;
			new User(newUser).save().then(callback());
		});
	});
} 

module.exports.findByUsername = (userName, callback) => {
	User.findOne({lower_username: userName.toLowerCase()}, (err, docs) => {
		callback(err, docs);
	});
}

module.exports.checkUsedData = (username, email, callback) => {
	User.findOne({
		$or: [
			{lower_username: username.toLowerCase()}, 
			{email: email.toLowerCase()}
		]
	}, (err, docs) => callback(err, docs));
}