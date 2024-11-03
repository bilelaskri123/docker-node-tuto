const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
const app = express();

// connect to db
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 27017;
const DB_HOST = "mongo";

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(URI)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.error("failed to connect to db: ", error);
  });

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Hello Docker from container environment variable</h1>");
});

app.listen(PORT, () => {
  console.log(`app up and running on port: ${PORT}`);
});
