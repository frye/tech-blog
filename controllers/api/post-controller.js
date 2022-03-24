const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
	try {
		const posts = await Post.findAll();
		res.render('homepage', { posts });
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.post('/', withAuth, async (req, res) => {
	try {
		const postData = await Post.create({
			...req.body,
			userId: req.session.user_id
		});
		if (!postData) {
			res.status(400).json({ message: "Could not create post" });
			return;
		} else {
			res.redirect('/');
		}
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

module.exports = router;