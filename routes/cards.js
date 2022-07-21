const express = require("express");
const router = express.Router();
const {
  data: { cards },
} = require("../data/flashcardData.json");

router.get("/", (req, res) => {
  const index = Math.floor(Math.random() * cards.length);
  res.redirect(`/cards/${index}?side=question`);
});

router.get("/:id", (req, res) => {
  console.log(req);
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  let { hint } = cards[id];
  if (side === "answer") hint = "";
  const button = side === "answer" ? "question" : "answer";
  const templateData = { id, text, hint, button };
  res.render("card", templateData);
});

module.exports = router;
