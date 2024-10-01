const pool = require("./pool");

async function getMessages(queryObj) {
  const { username, sort } = queryObj;
  let query = "SELECT * FROM messages";
  if (username) {
    query += " " + "WHERE username ILIKE $1";
  }
  const sortOptions = {
    recent: "ORDER BY created_at DESC",
    title: "ORDER BY title ASC",
    username: "ORDER BY username ASC",
  };
  // Check if the sort value is valid and exists in sortOptions
  if (sortOptions[sort]) {
    query += " " + sortOptions[sort];
  }

  const params = username ? [`%${username}%`] : []; // Include wildcards for LIKE
  const { rows } = await pool.query(query, params);
  return rows;
}

async function getMessagesSortedBy(sort) {
  let query = "SELECT * FROM messages";
  const sortOptions = {
    recent: "ORDER BY created_at DESC",
    title: "ORDER BY title ASC",
    username: "ORDER BY username ASC",
  };

  // Check if the sort value is valid and exists in sortOptions
  if (sortOptions[sort]) {
    query += " " + sortOptions[sort];
  }
  // Add more sorting options if needed
  const { rows } = await pool.query(query);
  return rows;
}

async function insertMessage(avatar, title, text, username) {
  await pool.query(
    "INSERT INTO messages (avatar, title, text, username, created_at) VALUES ($1,$2,$3,$4,NOW())",
    [avatar, title, text, username]
  );
}

async function getMessageById(id) {
  return await pool.query("SELECT * FROM messages WHERE id=$1", [id]);
}

async function getMessageByUsername(username) {
  return await pool.query("SELECT * FROM messages WHERE username=$1", [
    username,
  ]);
}

module.exports = {
  getMessagesSortedBy,
  insertMessage,
  getMessageById,
  getMessageByUsername,
  getMessages,
};
