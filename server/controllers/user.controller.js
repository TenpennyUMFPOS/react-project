const User = require("../models/User");


/**
 *
 * @param {*} req express request
 * @param {*} res express response
 * @param {*} next express next middleware
 */
async function createUser(req, res, next) {
    try {
        let { firstName, lastName, email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return res.status(409).json({ message: "user_exist" });
        }


        await User.create({
            firstName,
            lastName,
            email,
            password,
        });

        return res.status(201).json({ message: "user_created" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "an error occurred please try later" });
    }
}

/**
 *
 * @param {*} req  express request
 * @param {*} res  express response
 * @param {*} next express next middleware
 */
async function findAllUsers(req, res, next) {
    try {
        const users = await User.findAll({
            attributes: { exclude: "password" },
        });
        return res.status(200).json(users);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "an error occurred please try later" });
    }
}

async function findUserByEmail(email) {
    return await User.findOne({
        include: [
            { model: Role, include: [{ model: Permission, attributes: ["key"] }] },
        ],
        where: { email: email },
    });
}




module.exports = {
    createUser,
    findAllUsers,
    findUserByEmail
};