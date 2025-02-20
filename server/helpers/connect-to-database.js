const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD || null,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: console.log,
});

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log(" Database connection established successfully.");
    } catch (error) {
        console.error(" Unable to connect to the database:", error);
    }
}

module.exports = { sequelize, connectToDatabase };
