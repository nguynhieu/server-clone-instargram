const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
  sender: String,
  viewer: String,
  time: String
})
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification