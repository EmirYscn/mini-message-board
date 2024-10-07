const db = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const validateMessage = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Title can not be less than 2 and more than 30 characters"),
  body("author")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage(
      "Author name can not be less than 2 and more than 20 characters"
    ),
  body("message")
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage(
      "Message text can not be less than 2 and more than 255 characters"
    ),
];

const validateQuery = [
  query("username")
    .optional({ checkFalsy: true }) // Make the username optional
    .isLength({ min: 2 }) // If username is present, it must be at least 2 characters long
    .escape()
    .withMessage("Username must be at least 2 characters long"),
];

const getMessages = [
  validateQuery,
  async (req, res) => {
    const { sort = "all", username = "" } = req.query;

    // Check for validation errors early
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.render("index", {
        errors: result.array(),
        title: "Message Board",
        messages: [], // Return empty messages if there's an error
        sort,
        username,
      });
    }

    try {
      // Fetch messages from the database
      const messages = await db.getMessages(req.query);

      // Render page with fetched messages
      res.render("index", {
        title: "Message Board",
        messages,
        sort,
        username,
      });
    } catch (error) {
      // Log and handle errors efficiently
      console.error("Error fetching messages:", error);
      res.status(500).render("index", {
        title: "Message Board",
        errors: [{ msg: "An error occurred while fetching messages." }],
        messages: [],
        sort,
        username,
      });
    }
  },
];

async function createMessageGet(req, res) {
  res.render("form", { replyingTo: req.query.user || null });
}

const createMessagePost = [
  validateMessage,
  async (req, res) => {
    const result = validationResult(req);
    const message = req.body;
    if (!result.isEmpty()) {
      return res.render("form", {
        errors: result.array(),
        replyingTo: req.query.user || null,
        title: message.title,
        author: message.author,
        message: message.message,
      });
    }
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
  },
];

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
