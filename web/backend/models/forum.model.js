const db = require('../config/db');

async function getAllPosts() {
    const result = await db.query('SELECT * FROM forum_posts ORDER BY date DESC');
    return result.rows;
}

async function createPost(username, text, fileUrl) {
    const result = await db.query(
        'INSERT INTO forum_posts (username, text, file_url, date) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [username, text, fileUrl]
    );
    return result.rows[0];
}

module.exports = {
    getAllPosts,
    createPost,
};
