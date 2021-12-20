const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    email: {type: String, required: true, maxlength: 50},
    password: {type: String, required: true, maxlength: 100},
    username: {type: String, required: true, maxlength: 30}
  }
);

module.exports = mongoose.model('Admin', AdminSchema);