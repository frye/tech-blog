const router = require('express').Router();
const { User, Post } = require('../models');

router.get('/', async (req, res) => {

	try {
		const postData = await Post.findAll();
		const posts = postData.map(post => post.get({ plain: true }));

		res.render('homepage', { 
			posts,
			is_logged_in: req.session.is_logged_in 
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: err });
	}

});

router.get('/login', async (req, res) => {
	if (req.session.is_logged_in) {
		res.redirect('/');
		return;
	}

	res.render('login');
});

module.exports = router;