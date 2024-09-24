const express = require("express");
const cors = require("cors");
const Redis = require("redis");
const axios = require("axios");

const app = express();
const redisClient = Redis.createClient();

(async () => {
  await redisClient.connect();
})();

app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json({
    status: "success",
  });
});

app.get("/users", async (req, res) => {
  const limit = req.query.limit || 0;
  let users = await redisClient.get(`users-${limit}`);

  users = JSON.parse(users);
  if (!users) {
    users = await axios.get("https://fakestoreapi.com/users", {
      params: {
        limit,
      },
    });
    redisClient.set(`users-${limit}`, JSON.stringify(users));
  }

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

module.exports = app;
