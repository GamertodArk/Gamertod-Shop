const passport = require('passport');
const User = require('../models/users-model');
const localStrategy = require('passport-local').Strategy;

passport.use(
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		function (username, password, done) {
			User.findByUsername(username, (err, docs) => {
				if (err) {done(err)}

				if (docs) {
					console.log(docs);
				}else {
					console.log('User not found');
				}
			});
		}
	)
);