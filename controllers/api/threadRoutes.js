const router = require('express').Router();
const { Thread, Reply, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all threads
router.get('/', async (req, res)=>{
    try {
      const threadData = await Thread.findAll();
      const threads = threadData.map((thread) => thread.get({ plain: true }))
      console.log(threads)
      res.render('threads', {
        loggedIn: req.session.loggedIn
      })
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Get a single post
  router.get("/:id", (req, res) => {
  Thread.findOne({
          where: {
              id: req.params.id,
          },
          attributes: ["id", "title", "content", "created_at"],
          include: [{
                  model: User,
                  attributes: ["name"],
              },
              {
                  model: Reply,
                  attributes: ["id", "reply_text", "thread_id", "user_id", "created_at"],
                  include: {
                      model: User,
                      attributes: ["name"],
                  },
              },
          ],
      })
      .then((dbThreadData) => {
          if (!dbThreadData) {
              res.status(404).json({
                  message: "No thread found with this id"
              });
              return;
          }
          res.json(dbThreadData);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
  });

router.post('/', async (req, res) => {
  try {
    const threadData = await Thread.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
      
  });
  res.status(200).json(threadData);
   
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, (req, res) => {
  Thread.update({
          title: req.body.title,
          content: req.body.content
      }, {
          where: {
              id: req.params.id
          }
      }).then(dbThreadData => {
          if (!dbThreadData) {
              res.status(404).json({ message: 'No thread found with this id' });
              return;
          }
          res.json(dbThreadData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const threadData = await Thread.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!threadData) {
      res.status(404).json({ message: 'No thread found with this id!' });
      return;
    }

    res.status(200).json(threadData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
