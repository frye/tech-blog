const router = require('express').Router();
const userRoutes = require('./user-controller');
const postRoutes = require('./post-controller');
const commentRoutes = require('./comment-controller');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;