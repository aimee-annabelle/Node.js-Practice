const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

//redirect

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
// page not found
app.use((req, res) => {
  res.sendFile("./views/404.html", { root: __dirname });
});
