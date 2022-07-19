const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

const mineral = "Nickle";

app.set("view engine", "pug");

app.get("/", (req, res) => {
  const name = req.cookies.username;
  if (!name) res.redirect("hello");
  else res.render("index", { name });
});

app.get("/cards", (req, res) => {
  res.locals.prompt = `What city is the ${mineral} Capital of the World - redux?`;
  res.render("card", { hint: "Also know as Suds.", colors });
});

app.get("/hello", (req, res) => {
  if (req.cookies.username) res.redirect("/");
  res.render("hello");
});

app.post("/hello", (req, res) => {
  if (!req.body.username.trim()) res.render("hello");
  res.cookie("username", req.body.username);
  res.redirect("/");
});

app.post("/goodbye", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`The app is running on localhost:${port}`);
});
