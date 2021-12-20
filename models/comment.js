const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    text: {type: String, required: true, maxlength: 1000},
    username: {type: String, required: true, maxlength: 30},
    post: {type: Schema.types.ObjectId, ref: 'Post', required: true},
    date: {type: Date, required: true}
  }
);

module.exports = mongoose.model('Comment', CommentSchema);