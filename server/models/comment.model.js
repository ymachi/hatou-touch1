import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; 

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max: 5
    }
  },
  userId: {
    type: DataTypes.STRING, 
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'comments'
});

export default Comment;
