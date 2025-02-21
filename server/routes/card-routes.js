const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card-controller');

// Use Multer middleware for image upload on /addCard route
router.post("/addCard", cardController.upload.single('image'), cardController.addCard);
router.get("/getCards", cardController.getAllCards);
router.get("/cards/:UserId", cardController.getUserCards);
router.put("/cards/favorite/:cardId", cardController.addToFavorites);
router.get("/cards/favorites/:userId", cardController.getFavCards);
router.get("/card/:cardId", cardController.getCardById);

module.exports = router;
