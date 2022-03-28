const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
        //Exclude password, we do not want to query that.
          attributes: { exclude: ['password'] },
          include: [{ model: Post }],
      });
      const user = userData.get({ plain: true });
      res.render('dashboard', {
          ...user,
          is_logged_in: req.session.is_logged_in,
          logged_in_name: req.session.logged_in_name,
      });
  } catch (error) {
      res.status(500).json(error);
  }
});

module.exports = router;