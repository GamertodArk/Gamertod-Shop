const router = require('express').Router();
// const validator = require('express-validator');

router.get('/login', (req, res) => {
	res.render('login', {title: 'Iniciar sesion'});
});

router.get('/signup', (req, res) => {
	res.render('signup', {title: 'Registrate'});
});


// register a user
router.post('/signup', (req, res) => {
	

	// Check if the inputs are empty
	var inputs = [
		{
			input: 'name',
			msg: {
				input_id: 'test',
				class: 'error'
			}
		},
		{
			input: 'last_name',
			msg: 'Tienes que escribir un apellido'
		},
		{
			input: 'username',
			msg: 'Tienes que escribir un nombre de usuario'
		},
		{
			input: 'email',
			msg: 'Tienes que dar un email'
		},
		{
			input: 'password',
			msg: 'Tienes que escribir una contraseña'
		}

	];


	inputs.forEach((item, index) => {
		req.checkBody(item.input, item.msg).not().isEmpty();
	});

	let errors = req.validationErrors(); 
	if (errors) {
		// res.status(422).json({errors: errors});
		res.render('signup', {title: 'Registrate', errors: errors});
	}else {
		res.send('Hello world');
	}
});

module.exports = router;