const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Content is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const postContent = new Post({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar
      });

      const post = await postContent.save();
      return res.json(post);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

router.get('/', auth, async (req,res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    return res.json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({msg: 'Server Error'})
  }
});

router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found'})
    }
    
    res.json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({msg: 'Server Error'})
  }
})

router.delete('/:post_id', auth, async (req, res) => {
  try {
    await Post.findOneAndRemove(req.params.post_id);

    return res.json({ msg: 'Post is removed' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

router.put('/comment/:post_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.post_id);

    commentFields = {
      user: req.user.id,
      username: user.name,
      avatar: user.avatar,
      text: req.body.text
    };

    post.comments.unshift(commentFields);
    await post.save();

    return res.json(post);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    post.comments = post.comments.filter(
      comment => comment._id != req.params.comment_id
    );

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.put('/like/:post_id', auth, async (req, res) => {
  try {

    const post = await Post.findById(req.params.post_id);

    const likeIndex = post.likes
      .findIndex(like => like.user === req.user.id.toString());

    if (likeIndex != -1) 
      { post.likes.splice(likeIndex,1) }
    else {
      post.likes.unshift({ user: req.user.id.toString() });
    };

    await post.save();
    res.json(post.likes);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
