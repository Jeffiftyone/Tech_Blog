const router = require('express').Router();
const sequelize = require('../config/connection');
const { Thread, User, Reply } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Thread.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'content'
      ],
      include: [
        {
          model: Reply,
          attributes: ['id', 'reply_text', 'thread_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
      .then(dbThreadData => {
        // serialize data before passing to template
        const threads = dbThreadData.map(thread => thread.get({ plain: true }));
        res.render('dashboard', { threads, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Thread.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'content'
      ],
      include: [
        {
          model: Reply,
          attributes: ['id', 'reply_text', 'thread_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
      .then(dbThreadData => {
        if (!dbThreadData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const thread = dbThreadData.get({ plain: true });

        res.render('edit-thread', {
            thread,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// router.get('/create/', (req, res) => {
//     Thread.findAll({
//       where: {
//         // use the ID from the session
//         user_id: req.session.user_id
//       },
//       attributes: [
//         'id',
//         'title',
//         'post_date',
//         'content'
//       ],
//       include: [
//         {
//           model: Reply,
//           attributes: ['id', 'reply_text', 'thread_id', 'user_id', 'post_date'],
//           include: {
//             model: User,
//             attributes: ['name']
//           }
//         },
//         {
//           model: User,
//           attributes: ['name']
//         }
//       ]
//     })
//       .then(dbThreadData => {
//         // serialize data before passing to template
//         const threads = dbThreadData.map(thread => thread.get({ plain: true }));
//         res.render('create-thread', { threads, loggedIn: true });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

router.get('/create', (req, res) => {
  res.render('create-thread');
});

module.exports = router;