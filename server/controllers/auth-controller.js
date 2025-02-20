const User = require('../models/user');
const jwt = require("jsonwebtoken");
const userController = require('./user-controller');

async function login(req, res) {
    try {
        let { email, password } = req.body;

        const user = await userController.getUserByEmail(email);
        if (!user) return res.status(401).json({ message: "invalid_mail_password" });

        let match = user.checkPassword(password);
        if (!match) return res.status(401).json({ message: "invalid_mail_password" });

        let jwtToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: 86400 }
        );
        return res.json({
            userId: user.id,
            token: jwtToken,
            expiresIn: 86400,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "an_error_occurred_in_logging_in", error });
    }
}


module.exports = { login };