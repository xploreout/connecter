const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: String
   }],
  comments: [
    {
      text: String,
      user: String,
      avatar: String,
      username: String
    }]
});

module.exports = Post = mongoose.model('post', PostSchema);