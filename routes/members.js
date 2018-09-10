const router = require('express').Router();

router.get('/', (req, res) => {
	if (req.user) {
		
		res.render('members_home', {title: req.user.username, username: req.user.username});
		
	}else {
		res.redirect('/users/login');
	}
});

// Logout a user
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;