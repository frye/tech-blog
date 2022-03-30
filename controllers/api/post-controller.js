const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
	try {
		const posts = await Post.findAll();
    res.json(posts);
	} catch (err) {
		res.status(400).json({ message: err });
	}
});

router.post('/', withAuth, async (req, res) => {
	try {
		const postData = await Post.create({
			...req.body,
			user_id: req.session.user_id
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

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(400).json({ message: "Could not find post" });
      return;
    }
    const updatedPost = await postData.update({
      ...req.body,
      user_id: req.session.user_id
    });
    if (!updatedPost) {
      res.status(400).json({ message: "Could not update post" });
      return;
    } else {
      res.status(200).json(updatedPost);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(400).json({ message: "Could not find post" });
      return;
    }
    const deletedPost = await postData.destroy();
    if (!deletedPost) {
      res.status(400).json({ message: "Could not delete post" });
      return;
    } else {
      res.status(200).json(deletedPost);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;