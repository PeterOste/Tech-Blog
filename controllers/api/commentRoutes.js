const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /:postId/comments - Get comments for a specific blog post.
router.get('/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({
            where: { post_id: postId },
        });

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST /:postId/comments - Create a new comment for a specific blog post. 
router.post('/:postId/comments', withAuth, async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.session.user_id; 

        const newComment = await Comment.create({
            text: req.body.text,
            post_id: postId,
            user_id: userId,  
        });

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;