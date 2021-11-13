
const router = require('express').Router();
const { Reply } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newReply = await Reply.create({
      ...req.body, 
      thread_id: req.body.thread_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newReply);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
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
