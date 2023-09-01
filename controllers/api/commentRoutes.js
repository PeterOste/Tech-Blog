const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /:postId/comments - Get comments for a specific blog post.

// POST /:postId/comments - Create a new comment for a specific blog post. 