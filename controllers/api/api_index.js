const router = require('express').Router();
const userRoutes = require('./userRoutes');
const threadRoutes = require('./threadRoutes');

router.use('/users', userRoutes);


module.exports = router;
