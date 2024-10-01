const express = require("express");
const indexController = require("../controllers/indexController");

const router = express.Router();

router.get("/", indexController.getMessages);
router.get("/:sort", indexController.getMessages);
router.get("/new", indexController.createMessageGet);
router.post("/new", indexController.createMessagePost);
router.get("/new/:user", (req, res) => {
  res.render("form", { replyingTo: req.params.user || null });
});

router.get("/message/:id", indexController.getMessage);
module.exports = router;
