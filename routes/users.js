const router = require('express').Router();

router.get('/login', (req, res) => {
	res.render('login', {title: 'Iniciar sesion'});
});

module.exports = router;