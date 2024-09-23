const express = require("express");
const dotenv = require("dotenv");
const path = require("node:path");

const indexRouter = require("./routes/indexRouter");

dotenv.config({ path: "./config.env" });

const app = express();

// setting up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app middleware to use form body in post router
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// set router
app.use(indexRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages: messages });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
