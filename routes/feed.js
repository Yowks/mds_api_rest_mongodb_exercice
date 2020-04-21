const express = require('express');
const feedController = require('../controller/feed');
const router = express.Router();

 

// GET /feed/posts
router.get('/posts', feedController.getAllPosts);

// POST /feed/post
router.post('/posts', feedController.createPost);

// GET /feed/posts/{id}
router.get('/posts/:id', feedController.getPost);
 
// UPDATE /feed/posts/{id}
router.put('/posts/:id', feedController.updatePost);

// DELETE /feed/posts/{id}
router.delete('/posts/:id', feedController.deletePost);

module.exports = router;