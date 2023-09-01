const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// GET / - Get existing blog posts for the homepage.
router.get('/', (req, res) => {
    try {
      // Retrieve and send existing blog posts
      // ...
    } catch (error) {
      // Handle error
      // ...
    }
});

// GET /:id - Get a specific blog post by ID.
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    res.status(200).json(postData);
  } catch (error) {
  
    res.status(500).json(error);
  }
});

// POST /create - Create a new blog post.
router.post('/create', withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });

      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json(err);
    }
});

// PUT /:id - Update a specific blog post.
router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        }
      );

      if (updatedPost[0] === 0) {
        res.status(404).json({ message: 'No post found with this id'});
        return;
      }
      
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
});

// DELETE /:id - Delete a specific blog post.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;