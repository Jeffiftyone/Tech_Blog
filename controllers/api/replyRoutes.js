
const router = require('express').Router();
const { Reply, Thread, User } = require('../../models');
const withAuth = require('../../utils/auth');

//get all replies from thread
router.get('/:id',async (req, res) => {
  try {
      const replyData = await Reply.findAll({
          where: { thread_id: req.params.id },
          include: [{ model: Thread }, { model: User }]
      });
      const replies = replyData.map((reply) => reply.get({ plain: true }))
      const thread = replyData[0].thread.title;
      const user = replyData[0].user.name

      res.render('reply', {
          replies, thread, user, loggedIn: req.session.loggedIn
      })
  } catch (error) {
      res.status(500).json(error);
  }
});


//Create a new reply
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Reply.create({
      body: req.body.reply_body,
      thread_id: req.body.thread_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(dbReplyData => res.json(dbReplyData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

//DELETE reply
router.delete('/:id',withAuth, async (req, res) => {
  try {
    const replyData = await Reply.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!replyData) {
      res.status(404).json({ message: 'No reply found with this id!' });
      return;
    }

    res.status(200).json(replyData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
