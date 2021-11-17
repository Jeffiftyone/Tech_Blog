const router = require('express').Router();
const {User, Thread} = require('../models');

//All threads
router.get('/', async(req,res)=>{
    try {
      const threadData= await Thread.findAll({
      include: [
        {
          model: User,
          attributes: ['title'],
        },
      ],
    });
    const threads = threadData.map((thread) => thread.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
     threads, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
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

  module.exports = router