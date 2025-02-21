const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment-controller');


router.post('/addComment/:cardId', commentController.createComment);
router.get('/card/:cardId/comments', commentController.getCommentsForCard);

module.exports = router;
