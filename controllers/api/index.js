const router = require('express').Router();
const userRoutes = require('./user-controller');

router.use('/users', userRoutes);

module.exports = router;