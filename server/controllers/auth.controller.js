const User = require("../models/User");
const jwt = require("jsonwebtoken");
const userController = require('../controllers/user.controller');

async function login(req, res, next) {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "invalid_email_password" });
        }

        let isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "invalid_email_password" });
        }

        let jwtToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.secretKey,
            { expiresIn: 86400 }
        );
        return res.status(200).json({
            token: jwtToken,
            expiresIn: 86400,

        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "An error occurred, please try again!" });
    }

}

module.exports = { login };