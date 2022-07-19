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
  res.render("index");
});

app.get("/cards", (req, res) => {
  res.locals.prompt = `What city is the ${mineral} Capital of the World - redux?`;
  res.render("card", { hint: "Also know as Suds.", colors });
});

app.get("/hello", (req, res) => {
  res.render("hello", { name: req.cookies.username });
});

app.post("/hello", (req, res) => {
  res.cookie("username", req.body.username);
  res.render("hello", { name: req.body.username });
});

app.listen(port, () => {
  console.log(`The app is running on localhost:${port}`);
});
