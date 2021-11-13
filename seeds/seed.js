const sequelize = require('../config/connection');
const { User, Thread, Reply } = require('../models/models_index');

const userData = require('./userData.json');
const threadData = require('./threadData.json');
const replyData = require('./replyData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const thread of threadData) {
    await Thread.create({
      ...thread,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const reply = await Reply.bulkCreate(replyData);
  process.exit(0);
};

seedDatabase();
