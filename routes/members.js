const router = require('express').Router();

router.get('/', (req, res) => {
	if (req.user) {
		res.send('You are a member');
	}else {
		res.redirect('/users/login');
	}
});

module.exports = router;