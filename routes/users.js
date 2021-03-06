const passport = require('passport');
const router = require('express').Router();
const User = require('../models/users-model');
const passportSetup = require('../login_conf/passport-conf');

// If the user is alredy logged in, redirect him to the members section
router.use((req, res, next) => {
	if (req.user) { res.redirect('/members'); }
	else {next();}
});

router.get('/login', (req, res) => {
	res.render('guests/login', {title: 'Iniciar sesion', failure: req.flash('error')[0], success: req.flash('singup_success')[0]});
});

router.get('/signup', (req, res) => {
	res.render('guests/signup', {title: 'Registrate'});
});

// Login a user
router.post('/login',
	passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: true}),
	(req, res) => {
	res.redirect('/members');
});

// register a user
router.post('/signup', (req, res) => {

	// Check if the inputs are empty
	for(let param in req.body){
		req.checkBody(param, 'testting').not().isEmpty();
	}
	
	let errors = req.validationErrors(); 
	if (errors) {
		res.json({error: true, isEmpty:true, errors});
		console.log(errors);
	}else {

		// Check for the rest of the errors
		req.checkBody('name', 'El nombre es demasiado corto').isLength({min: 3});
		req.checkBody('last_name', 'El apellido es demasiado corto').isLength({min: 3});
		req.checkBody('username', 'El usuario es demasiado corto').isLength({min: 5});
		req.checkBody('email', 'El email ingresado no es valido').isEmail();
		req.checkBody('password', 'La contraseña debe tener un minimo de 8 caracteres').isLength({min: 8});
		req.checkBody('password2', 'Las contraseñas no coinciden').equals(req.body.password);

		let errors2 = req.validationErrors();
		if (errors2) {
			console.log('Errors');
			res.json({error: true, isEmpty: false, errors: errors2});
		}else {
			


			User.checkUsedData(req.body.username, req.body.email, (err, docs) => {
				if (err) {console.log(err);}

				// The data in not in used
				if (!docs) {

					// Organazing all the user data
					let newUser = {
						name: req.body.name,
						last_name: req.body.last_name,
						email: req.body.email.toLowerCase(),
						gender: req.body.gender,
						country: req.body.country,
						password: req.body.password,
						birthday: {
							b_day: req.body.b_day,
							b_month: req.body.b_month,
							b_year: req.body.b_year
						},
						
						username: req.body.username,
						lower_username: req.body.username.toLowerCase()
					}

					// Save the user to the database
					User.saveNewUser(newUser, () => {
						req.flash('singup_success', 'Te has registrado excitosamente y ya puedes iniciar sesion');
						res.json({error: false});
					});

				}else {
					let json = {
						error: true,
						isEmpty: false,
						errors: [
							{
								param: 'username',
								msg: 'El email o el usuario ya estan en uso'
							},
							{
								param: 'email',
								msg: 'El email o el usuario ya estan en uso'								
							}
						]
					}
					res.json(json);
				}
			});
		}
	}

});

module.exports = router;