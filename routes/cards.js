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
  let { side } = req.query;
  if (!side) side = "question";
  else if (side !== "answer") side = "question";
  let { id } = req.params;
  if (id < 0) id = cards.length - 1;
  else if (id >= cards.length) id = 0;
  const text = cards[id][side];
  let { hint } = cards[id];
  if (side === "answer") hint = "";
  const button = side === "answer" ? "question" : "answer";
  const templateData = { id, text, hint, button };
  res.render("card", templateData);
});

module.exports = router;
