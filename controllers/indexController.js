const db = require("../db/queries");

async function getMessages(req, res) {
  const { sort = "all", username = "" } = req.query;
  try {
    // const messages = await db.getMessagesSortedBy(sort);
    const messages = await db.getMessages(req.query);
    res.render("index", { title: "Message Board", messages, sort, username });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("An error occurred while fetching messages");
  }
}
async function createMessageGet(req, res) {
  res.render("form", { replyingTo: req.query.user || null });
}

async function createMessagePost(req, res) {
  const message = req.body;
  try {
    await db.insertMessage(
      "male",
      message.title,
      message.message,
      message.author.charAt(0).toUpperCase() + req.body.author.slice(1)
    );
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect("/");
  }
}

async function getMessage(req, res) {
  const { id } = req.params;
  const { rows } = await db.getMessageById(id);
  const { username } = rows[0];

  let { rows: otherMessagesByUser } = await db.getMessageByUsername(username);

  otherMessagesByUser = otherMessagesByUser.filter((msg) => msg.id !== id * 1);

  res.render("message", { message: rows[0], otherMessagesByUser });
}

module.exports = {
  getMessages,
  createMessageGet,
  createMessagePost,
  getMessage,
};
