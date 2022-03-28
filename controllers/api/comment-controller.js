const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req,res) => {
  console.log(req.body);
  try {
    const commentData = Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });
    res.redirect (req.header('Referer'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;