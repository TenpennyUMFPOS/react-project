const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post('/register', userController.registerUser);

// Route to get user's cards
//router.get('/:userId/cards', userController.getUserCards);

/* --- TEST ROUTES --- */
router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;
