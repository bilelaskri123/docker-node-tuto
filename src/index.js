const express = require("express");
const mongoose = require("mongoose");
const redis = require("redis");
const os = require("node:os");
// const { Client } = require("pg");

// connect to postgres db
// const DB_USER = "root";
// const DB_PASSWORD = "example";
// const DB_PORT = 5432;
// const DB_HOST = "postgres";

// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client = new Client({
//   connectionString: URI,
// });

// client
//   .connect()
//   .then(() => console.log("connected to postgres db"))
//   .catch((error) => console.error("error connect to postgres db: ", error));

// init app
const PORT = process.env.PORT || 4000;
const app = express();

// connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = "redis";
const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient.on("error", (error) => console.log("redis client error: ", error));
redisClient.on("connect", () => console.log("redis client connected"));
redisClient.connect();

// connect to mongodb
const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 27017;
const DB_HOST = "mongo";

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.error("failed to connect to db: ", error);
  });

app.get("/", async (req, res) => {
  console.log(`Os IP address: ${os.hostname()}`);
  await redisClient.set("greeting", "hello from redis", "EX", (ttl = 60));
  res.status(200).send("<h1>Hello Docker using docker swarm</h1>");
});

app.get("/greeting", async (req, res) => {
  const greeting = await redisClient.get("greeting");
  if (greeting) {
    res.status(200).send("<h1>Hello Docker from Redis</h1>");
  } else {
    res.status(200).send("<h1>Hello Docker from Server</h1>");
  }
});

app.listen(PORT, () => {
  console.log(`app up and running on port: ${PORT}`);
});
