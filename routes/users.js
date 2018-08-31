const router = require('express').Router();
// const validator = require('express-validator');

router.get('/login', (req, res) => {
	res.render('login', {title: 'Iniciar sesion'});
});

router.get('/signup', (req, res) => {
	res.render('signup', {title: 'Registrate'});
});

router.post('/test', (req, res) => {
	res.send(req.body.name);
});

// register a user
router.post('/signup', (req, res) => {
	// let data = JSON.parse(req.body.data);
	// console.log(req.body);


	for(let param in req.body){
		// console.log(data[pa]);
		req.checkBody(param, 'testting').not().isEmpty();
	}
	
	// Check if the inputs are empty
	// var inputs = [
	// 	{
	// 		input: 'name',
	// 		msg: {
	// 			input_id: 'test',
	// 			class: 'error'
	// 		}
	// 	},
	// 	{
	// 		input: 'last_name',
	// 		msg: 'Tienes que escribir un apellido'
	// 	},
	// 	{
	// 		input: 'username',
	// 		msg: 'Tienes que escribir un nombre de usuario'
	// 	},
	// 	{
	// 		input: 'email',
	// 		msg: 'Tienes que dar un email'
	// 	},
	// 	{
	// 		input: 'password',
	// 		msg: 'Tienes que escribir una contraseña'
	// 	}

	// ];


	// inputs.forEach((item, index) => {
	// 	req.checkBody(item.input, item.msg).not().isEmpty();
	// });

	let errors = req.validationErrors(); 
	if (errors) {
		res.json({error: true, isEmpty:true, errors});
		console.log(errors);
	}else {
		res.json({error: false});
		console.log('Not errors');
	}
	// if (errors) {
	// 	// res.status(422).json({errors: errors});
	// 	res.render('signup', {title: 'Registrate', errors: errors});
	// }else {
	// 	res.send('Hello world');
	// }
});

module.exports = router;