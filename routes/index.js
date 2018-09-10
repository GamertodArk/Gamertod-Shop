const router = require('express').Router();

router.get('/', (req, res) => {
	if (req.user) {res.redirect('/members')}
	else { res.render('home', {title: 'Home'}); }
});

module.exports = router;