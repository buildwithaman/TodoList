const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let items = ["Buy Food", "Cook Food", "Eat Food"];
let item = [];
let workItems = [];
let workItem = "";

app.get("/", function (req, res) {
  let todayDate = new Date();
  let options = {
    day: "numeric",
    weekDay: "long",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let date = todayDate.toLocaleDateString("en-US", options);
  res.render("todolist", { currentDate: date, toDoItems: items });
});

app.get("/work", function (req, res) {
  res.render("todolist", { currentDate: "Work List", toDoItems: workItems });
  res.redirect("/work");
});

app.post("/", function (req, res) {
  if (req.body.list === "Work List") {
    item = req.body.item;
    workItems.push(item);
    res.redirect("/work");
  } else {
    item = req.body.item;
    items.push(item);
    res.redirect("/");
  }
});
app.listen(3000, function () {
  console.log("Server has started at port 3000");
});
