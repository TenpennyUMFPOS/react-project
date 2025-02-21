const Card = require('../models/card');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

const addCard = async (req, res) => {
    try {
        if (!req.body.name || !req.body.type || !req.body.strength || !req.body.userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const imgUrl = req.file ? req.file.path.replace(/\\/g, "/") : null;
        const { name, type, strength, description, userId } = req.body;

        const card = await Card.create({
            name,
            type,
            strength,
            description,
            userId,
            imgUrl,
        });

        res.status(201).json(card);
    } catch (error) {
        console.error("Error in creating card:", error);
        res.status(500).json({ message: "Error creating card", error: error.message });
    }
};

const getAllCards = async (req, res) => {
    try {
        const cards = await Card.findAll();
        if (!cards.length) {
            return res.status(404).json({ message: "No cards found" });
        }
        res.json(cards);
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).json({ message: "Error fetching cards", error: error.message });
    }
};

const getUserCards = async (req, res) => {
    try {
        const { UserId } = req.params;
        if (!UserId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const userCards = await Card.findAll({ where: { userId: UserId } });
        res.json(userCards);
    } catch (error) {
        console.error("Error fetching user cards:", error);
        res.status(500).json({ message: "Error fetching user cards", error: error.message });
    }
};

const addToFavorites = async (req, res) => {
    try {
        const cardId = parseInt(req.params.cardId, 10);
        if (isNaN(cardId)) {
            return res.status(400).json({ message: "Invalid card ID" });
        }

        const card = await Card.findOne({ where: { id: cardId } });
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        card.set({ isFavorite: !card.isFavorite });
        await card.save();
        res.status(200).json({ card });
    } catch (error) {
        console.error("Error changing favorite status:", error);
        res.status(500).json({ message: "Error changing favorite status", error: error.message });
    }
};

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

        if (!favCards.length) {
            return res.status(404).json({ message: "No favorite cards found" });
        }

        res.status(200).json(favCards);
    } catch (error) {
        console.error("Error fetching favorite cards:", error);
        res.status(500).json({ message: "Error fetching favorite cards", error: error.message });
    }
};

const getCardById = async (req, res) => {
    try {
        const cardId = req.params.cardId;
        if (!cardId) {
            return res.status(400).json({ message: "Card ID is required" });
        }

        const card = await Card.findOne({ where: { id: cardId }, include: [{ model: User }] });
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.status(200).json(card);
    } catch (error) {
        console.error("Error fetching card:", error);
        res.status(500).json({ message: "Error fetching card", error: error.message });
    }
};

module.exports = { addCard, getAllCards, getUserCards, upload, addToFavorites, getFavCards, getCardById };
