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
		res.status(200).json(postData);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

module.exports = router;