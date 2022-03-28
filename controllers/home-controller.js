const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

	try {
		const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
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
		res.redirect('/dashboard');
		return;
	}

	res.render('login');
});

router.get('/newpost', withAuth, async (req, res) => {
	res.render('newpost');
});

module.exports = router;