const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const name = req.cookies.username;
  if (!name) res.redirect("hello");
  else res.render("index", { name });
});

router.get("/hello", (req, res) => {
  if (req.cookies.username) res.redirect("/");
  res.render("hello");
});

router.post("/hello", (req, res) => {
  if (!req.body.username.trim()) res.render("hello");
  res.cookie("username", req.body.username);
  res.redirect("/");
});

router.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

module.exports = router;
