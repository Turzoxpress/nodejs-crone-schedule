const express = require("express");
const app = express();
const nodeCron = require("node-cron");
const request = require("request");

app.get("/", (req, res) => {
  res.send("Welcome to Node Scheduler server!");
});

const job = nodeCron.schedule("*/5 * * * * *", () => {
  request("http://localhost:3000/", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body);
    }
  });
});

app.listen(3000, () => {
  console.log("Server started!");
  job.start();
});
