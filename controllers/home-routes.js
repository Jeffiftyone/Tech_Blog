const router = require('express').Router();
const {User, Thread, Reply} = require('../models');

//All threads
router.get('/', async(req,res)=>{
    try {
      const threadData= await Thread.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const threads = threadData.map((thread) => thread.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
     threads, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//get thread by id
router.get('/thread/:id', async (req, res) => {
  try {
    const threadData = await Thread.findByPk(req.params.id, {
      include: [
        {
          model: Reply,
          required: false,
          attributes: ['reply_text'],
          include: [{
            model: User,
            required: false,
            attributes: ['name'],
          }],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const thread = threadData.get({ plain: true });
    
    console.log(thread);
    res.render('thread', {
      ...thread,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
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