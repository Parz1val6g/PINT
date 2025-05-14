const forumPosts = require('../data/forum.mock');

exports.getPosts = async (req, res) => {
  res.json(forumPosts);
};

exports.createPost = async (req, res) => {
  const { text } = req.body;
  const fileUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null;

  const newPost = {
    id: forumPosts.length + 1,
    username: 'MockUser',
    text,
    fileUrl,
    date: new Date().toISOString()
  };

  forumPosts.push(newPost);
  res.status(201).json(newPost);
};
