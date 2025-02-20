const Card = require('../models/card');

async function addCard(req, res) {
    try {
        const { name, type, strength, description, userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Check if the card already exists
        const existingCard = await Card.findOne({ where: { name } });
        if (existingCard) {
            return res.status(409).json({ message: "Card already exists" });
        }

        // Create a new card
        const newCard = await Card.create({
            name,
            type,
            strength,
            description,
            userId
        });

        // Log the created card
        console.log("New card created:", newCard);

        return res.status(201).json({ message: "Card created successfully", card: newCard });
    } catch (error) {
        console.error("Error in creating card:", error);
        return res.status(500).json({ message: "Error in creating card", error: error.message });
    }
}


async function getAllCards(req, res) {
    try {
        const cards = await Card.findAll();
        return res.status(200).json(cards)
    } catch (error) {
        return res.status(500).json({ message: "error in retreiving cards" });
    }
}

async function getUserCards(req, res) {
    const userId = req.params.UserId;

    try {
        const cards = await Card.findAll({ where: { userId: userId } });
        return res.status(200).json(cards);
    } catch (error) {
        return res.status(500).json({ message: "Error in retrieving cards" });
    }
}




module.exports = ({ addCard, getAllCards, getUserCards })