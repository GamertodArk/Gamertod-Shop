const router = require('express').Router();

router.get('/', (req, res) => {
	if (req.user) {
		res.render('members_home', {title: req.user.username, username: req.user.username});		
	}else {
		res.redirect('/users/login');
	}
});

// Show the profile
router.get('/profile/:username', (req, res) => {
	console.log(req.params.username);
	res.send('Hello World');
});

// Logout a user
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;