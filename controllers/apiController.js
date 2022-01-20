const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Admin = require('../models/admin');


exports.posts_get = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate('author').exec();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// authorization missing
exports.posts_post = [
  body('title').trim().isLength({min: 1, max: 100}).withMessage('Title must be between 1 and 100 chars').escape(),
  body('text').trim().isLength({min: 1}).withMessage('Must include some text').escape(),
  body('author').trim().isLength({min: 1}).withMessage('Author must be specified').escape(),
  body('status').trim().isLength({min: 1}).withMessage('Status must be specified (Public/Private)').escape(),
  body('date').isISO8601().withMessage('Date must be specified').toDate(),
  async (req, res, next) => {
    const valError = validationResult(req);
    if (!valError.isEmpty()) {
      return res.status(400).json(valError.errors.map(el => ({param: el.param, msg: el.msg})));
    }
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      status: req.body.status,
      date: req.body.date
    });
    try {
      await post.save(err => {
        if (err) { return next(err); }
        res.status(200).json({200: 'Post created successfully'});
      });
    } catch (error) {
      next(error);
    }
  }
];

exports.postId_get = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate('author').exec();
    if (post) {
      return res.status(200).json(post);
    }
    res.status(404).json({ error: 'Post not found' });
  } catch (error) {
    next(error);
  }
};

exports.comments_get = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('post').exec();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

exports.commentId_get = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate('post').exec();
    if (comment) {
      return res.status(200).json(comment);
    }
    res.status(404).json({ error: 'Comment not found' });
  } catch (error) {
    next(error);
  }
};
