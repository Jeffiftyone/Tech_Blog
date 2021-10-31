const User = require('./User');
const Thread = require('./Thread');
const  = require('./Reply');

User.hasMany(Thread, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Thread.belongsTo(User, {
  foreignKey: 'user_id'
});

Thread.hasMany(,{
  foreignKey:'thread_id',
  onDelete:'CASCADE'

});

Reply.belongsTo(Thread, {
  foreignKey: 'Thread_id'
});

module.exports = { User, Thread };
