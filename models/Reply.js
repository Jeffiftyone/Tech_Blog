const {Model, DataTypes}=require('sequelize');
const sequelize = require('../config/connection');

class Reply extends Model {}

Reply.init({
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
    },
    reply_text:{
        type:DataTypes.STRING, 
    },
    thread_id:{
        type: DataTypes.INTEGER,
        references:{
            model:'thread',
            key:'id',
          },
    },
    user_id:{
        type: DataTypes.INTEGER,
        references:{
          model:'user',
          key:'id',
        },
      },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'reply',
  }
);

module.exports = Reply;
