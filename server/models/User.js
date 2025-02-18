const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const sequelize = require("../helpers/connect-to-database").sequelize;

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
        paranoid: true,
        timestamps: true,
    }
);

User.addHook("beforeSave", async (user, options) => {
    user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = User;

// add index section to the model