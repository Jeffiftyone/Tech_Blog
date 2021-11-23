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
        languages,loggedIn: req.session.loggedIn
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
          attributes: ["id", "title", "body", "post_date"],
          include: [{
                  model: User,
                  attributes: ["name"],
              },
              {
                  model: Reply,
                  attributes: ["id", "body", "thread_id", "user_id", "post_date"],
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
                  message: "No post found with this id"
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

router.post('/', withAuth, (req, res) => {
  Thread.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id
  })
    .then(dbThreadData => res.json(dbThreadData))
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
