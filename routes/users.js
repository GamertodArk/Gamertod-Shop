const router = require('express').Router();

router.get('/login', (req, res) => {
	res.render('login', {title: 'Iniciar sesion'});
});

router.get('/signup', (req, res) => {
	res.render('signup', {title: 'Registrate'});
});

module.exports = router;