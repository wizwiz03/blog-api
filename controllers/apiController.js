const Post = require('../models/post');
const Comment = require('../models/comment');

exports.posts_get = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate('author').exec();
    res.status(200).json(posts);
  } catch (error) {
    return next(err);
  }
};

exports.postId_get = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId).populate('author').exec();
    if (post) {
      return res.status(200).json(post);
    }
    res.status(404).json({error: 'Post not found'});
  } catch (error) {
    return next(err);
  }
};

exports.comments_get = async (req, res, next) => {
  try {
    const comments = await Comment.find({}).populate('post').exec();
    res.status(200).json(comments);
  } catch (error) {
    return next(err);
  }
};

exports.commentId_get = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentId).populate('post').exec();
    if (comment) {
      return res.status(200).json(comment);
    }
    res.status(404).json({error: 'Comment not found'});
  } catch (error) {
    return next(err);
  }
};
