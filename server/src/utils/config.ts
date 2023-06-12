import dotenv from "dotenv";
import mongoose from "mongoose";

const logger = require("./logger");

dotenv.config();

const Port = process.env.PORT || 4000;

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Database connection established...");
  } catch (error) {
    logger.error("Something went wrong with database connection!");
    process.exit(1);
  }
};

module.exports = {
  Port,
  databaseConnection,
};
