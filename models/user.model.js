const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  avatar: String,
  fullname: String,
  username: String,
  password: String
})
const User = mongoose.model('User', userSchema);

module.exports = User;