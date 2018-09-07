const passport = require('passport');
const User = require('../models/users-model');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findUserById(id, (err, docs) => {
		done(null, docs);
	});
});

passport.use(
	new localStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		function (email, password, done) {

			User.findByEmail(email, (err, docs) => {
				if (err) {done(err)}

				if (docs) {

					User.comparePasswords(password, docs.password, (err, res) => {
						if (err) {done(err)}

						if (res) {
							done(null, docs);
						}else {
							done(null, false, {message: 'Contraseña equivocada'});
						}
					});

				}else {
					done(null, false, {message: 'Email no encontrado'});
				}

			});
		}
	)
);