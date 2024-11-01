const express = require("express");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1>Hello Docker from container environment variable</h1>");
});

app.listen(PORT, () => {
  console.log(`app up and running on port: ${PORT}`);
});
