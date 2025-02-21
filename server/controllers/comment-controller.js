const Comment = require('../models/comment');
const Card = require('../models/card');
const User = require('../models/user');

const createComment = async (req, res) => {
    try {
        const { cardId } = req.params;
        const { userId, comment } = req.body;

        if (!cardId || isNaN(cardId)) {
            return res.status(400).json({ message: "Invalid or missing card ID" });
        }
        if (!userId || isNaN(userId)) {
            return res.status(400).json({ message: "Invalid or missing user ID" });
        }
        if (!comment || typeof comment !== "string" || comment.trim() === "") {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }

        const card = await Card.findByPk(cardId);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        const newComment = await Comment.create({
            comment,
            userId,
            cardId
        });

        const commentWithUser = await Comment.findOne({
            where: { id: newComment.id },
            include: [{
                model: User,
                attributes: ['username']
            }]
        });

        return res.status(201).json(commentWithUser);
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({ message: "Error creating comment", error: error.message });
    }
};

const getCommentsForCard = async (req, res) => {
    try {
        const cardId = req.params.cardId;

        if (!cardId || isNaN(cardId)) {
            return res.status(400).json({ message: "Invalid or missing card ID" });
        }

        const comments = await Comment.findAll({
            where: { cardId },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [['createdAt', 'ASC']]
        });

        if (!comments.length) {
            return res.status(404).json({ message: "No comments found for this card" });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Error fetching comments", error: error.message });
    }
};

module.exports = {
    createComment,
    getCommentsForCard
};
