const router = require('express').Router();

router.get('/', (req, res) => {
	if (req.user) {
		
		res.render('members_home', {title: req.user.username});
		
	}else {
		res.redirect('/users/login');
	}
});

module.exports = router;