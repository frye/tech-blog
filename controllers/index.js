const router = require('express').Router();
const homeRoutes = require('./home-controller');
const dashboardRoutes = require('./dashboard-controller');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;