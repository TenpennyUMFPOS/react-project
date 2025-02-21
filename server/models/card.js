const { DataTypes, Model } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const User = require('./user');

class Card extends Model { }
Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        strength: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'cards',
    }
);

// Define associations
User.hasMany(Card, {
    foreignKey: 'userId',
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
});
Card.belongsTo(User, { foreignKey: 'userId' });

module.exports = Card;
