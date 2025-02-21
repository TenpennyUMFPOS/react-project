const { DataTypes, Model } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const User = require('./user');
const Card = require('./card');

class Comment extends Model { }
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cardId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'comments',
    }
);

// Define associations
User.hasMany(Comment, {
    foreignKey: 'userId',
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
});
Comment.belongsTo(User, { foreignKey: 'userId' });

Card.hasMany(Comment, {
    foreignKey: 'cardId',
    onUpdate: "CASCADE",
    onDelete: "RESTRICT"
});
Comment.belongsTo(Card, { foreignKey: 'cardId' });

module.exports = Comment;
