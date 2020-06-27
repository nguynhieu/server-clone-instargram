const Post = require('../models/post.model');
const User = require('../models/user.model');
const Notification = require('../models/notification.model');

module.exports.index = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
}

module.exports.newFeed = async (req, res) => {
  const { file,
    body: {
      userId,
      caption
    }
  } = req;

  const user = await User.findOne({ _id: userId })
  const image = 'https://server-instar-clone.herokuapp.com/' + file.path.split('/').slice(1).join('/');
  const post = {
    userId,
    username: user.username,
    userAvatar: user.avatar,
    image,
    comments: [],
    likes: [],
    time: new Date(),
    caption
  }
  // await Post.insertMany(post);

  await Post.remove();

  res.json(post);
}

module.exports.handleLike = async (req, res) => {
  const { body: {
    sender, viewer, postId, time
  } } = req;

  const post = await Post.findOne({ _id: postId });

  if (post.likes.includes(sender)) {
    await Post.updateOne(
      { _id: postId },
      {
        $pull: {
          likes: sender
        }
      }
    )
  } else {
    await Post.updateOne(
      { _id: postId },
      {
        $push: {
          likes: sender
        }
      }
    )
  }

  const posts = await Post.find();

  res.json(posts.reverse());
}

module.exports.handleComment = async (req, res) => {
  const { body: {
    sender, postId, content
  } } = req;

  await Post.updateOne(
    { _id: postId },
    {
      $push: {
        comments: {
          username: sender,
          content
        }
      }
    }
  )

  const posts = await Post.find();

  res.json(posts.reverse());
}