const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      fs.writeFile(
        `${__dirname}/output.txt`,
        JSON.parse(body).message,
        (err, data) => {
          if (err) {
            console.log(err);
          }
          res.end("success");
        }
      );
    });
  }
  fs.readFile(`${__dirname}/input.txt`, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    if (data) {
      res.write(data);
    }
    res.end();
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
