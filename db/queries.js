const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
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
  getAllMessages,
  insertMessage,
  getMessageById,
  getMessageByUsername,
};
