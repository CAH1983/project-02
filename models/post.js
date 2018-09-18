// ---------------------  MODELS - POST ---------------------------------
const mongoose = require('mongoose');

// Schema of Comment box
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});


// Schema of the posts
const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true, pattern: /^https?:\/\/.+/ },
  caption: { type: String },
  comments: [ commentSchema ]
});

// ========== module exports ==========
module.exports = mongoose.model('userPost', postSchema );
