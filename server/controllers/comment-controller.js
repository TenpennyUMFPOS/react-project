const Comment = require('../models/comment');
const Card = require('../models/card');
const User = require('../models/user');

const createComment = async (req, res) => {
    try {
        const { cardId } = req.params;
        const { userId, comment } = req.body;

        // Check if the card exists
        const card = await Card.findByPk(cardId);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Create the comment
        const newComment = await Comment.create({
            comment,
            userId,
            cardId
        });

        // Fetch the new comment with the associated User data
        const commentWithUser = await Comment.findOne({
            where: { id: newComment.id },
            include: [{
                model: User, // Include the user who posted the comment
                attributes: ['username'] // Ensure only the username is fetched
            }]
        });

        return res.status(201).json(commentWithUser); // Return the comment with the User data
    } catch (error) {
        console.error("Error creating comment:", error);
        return res.status(500).json({ message: "Error creating comment", error });
    }
};

const getCommentsForCard = async (req, res) => {
    try {
        const cardId = req.params.cardId;

        // Fetch the comments related to the specific card, including the associated user
        const comments = await Comment.findAll({
            where: { cardId },
            include: [
                {
                    model: User, // Include the user who posted the comment
                    attributes: ['username'] // Make sure you're only fetching the username
                }
            ],
            order: [['createdAt', 'ASC']] // Order comments by creation date (optional)
        });

        if (!comments.length) {
            return res.status(404).json({ message: "No comments found for this card" });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Error fetching comments", error });
    }
};


module.exports = {
    createComment,
    getCommentsForCard
};
