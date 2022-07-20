const express = require("express");
const router = express.Router();
const {
  data: { cards },
} = require("../data/flashcardData.json");

router.get("/:id", (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  let { hint } = cards[id];
  if (side === "answer") hint = "";
  const templateData = { text, hint };
  res.render("card", templateData);
});

module.exports = router;
