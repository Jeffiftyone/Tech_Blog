const router = require('express').Router();
const userRoutes = require('./userRoutes');
const threadRoutes = require('./threadRoutes');
const replyRoutes = require('./replyRoutes')

router.use('/users', userRoutes);
router.use('/threads', threadRoutes);
router.use('/replies', replyRoutes);


module.exports = router;
