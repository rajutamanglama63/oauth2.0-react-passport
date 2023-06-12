import express from "express";
import dotenv from "dotenv";

const logger = require("./utils/logger");
const config = require("./utils/config");

dotenv.config();

config.databaseConnection();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(config.Port, () => {
  logger.info(`Server running on http://localhost:${config.Port}`);
});
