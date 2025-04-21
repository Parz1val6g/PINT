const path = require('path');
const fs = require('fs');

const getPosts = (req, res) => {
  const postsPath = path.join(__dirname, '../config/posts.json');
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  res.json(posts);
};

module.exports = { getPosts };
