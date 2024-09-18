const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const db = require("./config/database.config.js");
const ItemRoute = require("./routes/Item.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(db.url)
  .then(() => {
    console.log("Databse Connected Successfully!!");
  })
  .catch((err) => {
    console.log("Could not connect to the database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.use("/item", ItemRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
