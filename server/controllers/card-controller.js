const Card = require('../models/card');
const multer = require('multer');
const path = require('path');

// Set up storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure the "uploads" folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g. "1629384759123.jpg"
    },
});

const upload = multer({ storage });

// Add a new card with an image
const addCard = async (req, res) => {
    try {
        const imgUrl = req.file ? req.file.path.replace(/\\/g, "/") : null; // Ensure forward slashes
        const { name, type, strength, description, userId } = req.body;

        const card = await Card.create({
            name,
            type,
            strength,
            description,
            userId,
            imgUrl, // Store correctly formatted path
        });

        res.json(card);
    } catch (error) {
        console.error("Error in creating card:", error);
        res.status(500).json({ message: "Error creating card", error });
    }
};

// Fetch all cards
const getAllCards = async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.json(cards);
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ message: "Error fetching cards", error });
    }
};

// Fetch cards for a specific user
const getUserCards = async (req, res) => {
    try {
        const { UserId } = req.params;
        const userCards = await Card.findAll({ where: { userId: UserId } });
        res.json(userCards);
    } catch (error) {
        console.error("Error fetching user cards:", error);
        res.status(500).json({ message: "Error fetching user cards", error });
    }
};

const addToFavorites = async (req, res) => {
    try {
        const cardId = parseInt(req.params.cardId, 10);
        const card = await Card.findOne({ where: { id: cardId } });
        console.log("======>", card);
        card.set({ isFavorite: !card.isFavorite });
        await card.save();
        res.status(200).json({ card });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error changing to favs", error });
    }
}


const getFavCards = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const favCards = await Card.findAll({
            where: {
                isFavorite: true,
                userId: userId
            }
        });
        console.log(favCards);


        res.status(200).json(favCards);
    } catch (error) {
        console.error("Error fetching favorite cards:", error);
        res.status(500).json({ message: "Error fetching favs", error });
    }
};


module.exports = { addCard, getAllCards, getUserCards, upload, addToFavorites, getFavCards };
