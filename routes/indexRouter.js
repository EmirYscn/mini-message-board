const express = require("express");

const router = express.Router();

let idCounter = 4;
const messages = [
  {
    id: 1,
    avatar: "female",
    title: "Hi",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi reprehenderit ad veniam aliquam sed, alias illum voluptatibus illo fugiat nihil deleniti quidem iusto praesentium reiciendis sequi est expedita id voluptas?",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    avatar: "male",
    title: "hey",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi reprehenderit ad veniam aliquam sed, alias illum voluptatibus illo fugiat nihil deleniti quidem iusto praesentium reiciendis sequi est expedita id voluptas?",
    user: "Charles",
    added: new Date(),
  },
  {
    id: 3,
    avatar: "female",
    title: "Hi twice",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi reprehenderit ad veniam aliquam sed, alias illum voluptatibus illo fugiat nihil deleniti quidem iusto praesentium reiciendis sequi est expedita id voluptas?",
    user: "Amando",
    added: new Date(),
  },
];

router.get("/", (req, res) => {
  res.render("index", { title: "Message Board", messages: messages });
});
router.get("/new", (req, res) => {
  res.render("form");
});
router.get("/message/:id", (req, res) => {
  const messageId = req.params.id * 1;
  const message = messages.find((message) => message.id === messageId);
  let otherMessagesByUser = messages.filter(
    (msg) => msg.user === message.user && msg.id !== messageId
  );
  res.render("message", {
    message: message,
    otherMessagesByUser,
  });
});
router.post("/new", (req, res) => {
  const form = {
    id: idCounter++,
    avatar: "male",
    title: req.body.title,
    text: req.body.message,
    user: req.body.author.charAt(0).toUpperCase() + req.body.author.slice(1),
    added: new Date(),
  };
  messages.push(form);
  res.redirect("/");
});
module.exports = router;
