const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 100},
    text: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref:'Admin', required: true},
    status: {type: String, required: true, enum: ['Public', 'Private'], default: 'Public'},
    date: {type: Date, required: true}
  }
);

module.exports = mongoose.model('Post', PostSchema);