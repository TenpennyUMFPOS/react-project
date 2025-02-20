const { DataTypes, Model } = require('sequelize');
const sequelize = require('../helpers/connect-to-database').sequelize;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);



class User extends Model { }
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password:
        {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users'
    }
);

User.addHook("beforeSave", async (user, options) => {
    user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};




module.exports = User;
