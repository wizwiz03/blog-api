const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');


router.get('/posts', apiController.posts_get);
router.get('/posts/:postId', apiController.postId_get);
router.get('/posts/:postId/comments', apiController.comments_get);
router.get('/posts/:postId/comments/:commentId', apiController.commentId_get);

// authorization is missing
router.post('/posts', apiController.posts_post);

module.exports = router;