const router = require('express').Router();

router.get('/', async (req, res) => {
	res.render('homepage');
});

router.get('/login', async (req, res) => {
	if (req.session.is_logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

module.exports = router;