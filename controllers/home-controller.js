const router = require('express').Router();
const { User, Post, Comment } = require('../models');
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

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment
        }
      ]
    });
    const post = postData.get({ plain: true });
    // res.json(post);
    res.render('post-page', {
      ...post,
      user_id: req.session.user_id,
      is_logged_in: req.session.is_logged_in,
      logged_in_name: req.session.logged_in_name,
    });
  } catch (err) {
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