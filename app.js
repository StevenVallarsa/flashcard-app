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

// app.use((req, res, next) => {
//   console.log("Hello");
//   const err = new Error("Oops");
//   err.status = 500;
//   next(err);
// });

app.use((req, res, next) => {
  console.log("World");
  next();
});

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

app.use((req, res, next) => {
  const err = new Error("Not Found!");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

app.listen(port, () => {
  console.log(`The app is running on localhost:${port}`);
});
