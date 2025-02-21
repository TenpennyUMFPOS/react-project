const User = require('../models/user');
const { Op } = require('sequelize');

async function registerUser(req, res) {
    try {
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        });

        if (user) {
            return res.status(409).json({ message: "User with these credentials already exists" });
        }

        await User.create({ username, email, password });
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error in creating user:", error);
        return res.status(500).json({ message: "Error in creating user", error: error.message });
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await User.findAll();
        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}

async function getUserByEmail(email) {
    if (!email) {
        throw new Error("Email is required");
    }
    return await User.findOne({
        where: { email: email }
    });
}

module.exports = { registerUser, getAllUsers, getUserByEmail };
