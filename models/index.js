const User = require('./User');
const Thread = require('./Thread');
const  Reply= require('./Reply');

User.hasMany(Thread, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Reply, {
  foreignKey: 'user_id',
  onDelete:'CASCADE'
});


Thread.belongsTo(User, {
  foreignKey: 'user_id'
});

Thread.hasMany(Reply,{
  foreignKey:'thread_id',
  onDelete:'CASCADE'

});

Reply.belongsTo(Thread, {
  foreignKey: 'Thread_id'
});

Reply.belongsTo(User,{
  foreignKey:'user_id'
})

module.exports = { User, Thread, Reply };
