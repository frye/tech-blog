const router = require('express').Router();
const userRoutes = require('./user-controller');
const postRoutes = require('./post-controller');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;