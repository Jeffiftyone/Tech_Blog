const router = require('express').Router();
const {User, Thread, Reply} = require('../models/models_index');

//All threads
router.get('/', async(req,res)=>{
    try {
      const dbThreadData= await Thread.findAll();
        res.status(200);
    } catch (error) {
        res.status(400);
    }
});

//All threads by user
router.get('/', async(req,res)=>{
  try {
    const dbThreadData= await User.findAll();
      res.status(200);
  } catch (error) {
      res.status(400);
  }
});

//
// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });

  module.exports = router;