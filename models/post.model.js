const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  userId: String,
  image: String,
  username: String,
  userAvatar: String,
  caption: String,
  comments: [],
  likes: [],
  time: String
})
const Post = mongoose.model('Post', postSchema);

module.exports = Post