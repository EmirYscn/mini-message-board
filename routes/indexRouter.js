const express = require("express");

const router = express.Router();

const messages = [
  {
    avatar: "female",
    title: "Hi",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi reprehenderit ad veniam aliquam sed, alias illum voluptatibus illo fugiat nihil deleniti quidem iusto praesentium reiciendis sequi est expedita id voluptas?",
    user: "Amando",
    added: new Date(),
  },
  {
    avatar: "male",
    title: "hey",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi reprehenderit ad veniam aliquam sed, alias illum voluptatibus illo fugiat nihil deleniti quidem iusto praesentium reiciendis sequi est expedita id voluptas?",
    user: "Charles",
    added: new Date(),
  },
];

router.get("/", (req, res) => {
  res.render("index", { title: "Message Board", messages: messages });
});
router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", (req, res) => {
  const form = {
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
