const User = require('../models/user');
const { Op, where } = require('sequelize');



async function registerUser(req, res) {
    try {
        let { username, email, password } = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                    { username: username }
                ]
            }
        })
        if (user) {
            return res.status(409).json({ message: "user_with_creadentials_exists" })
        }
        await User.create({
            ...req.body
        });
        return res.status(201).json({ message: "user_created_successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "error_in_creating_user", error })
    }
}


async function getAllUsers(req, res) {
    try {
        return res.status(201).json(await User.findAll());
    } catch (error) {
        return res.status(500).json({ message: "error_in_ftching_users", error })
    }
}

async function getUserByEmail(email) {
    return await User.findOne({
        where: { email: email }
    })
}








module.exports = ({ registerUser, getAllUsers, getUserByEmail })