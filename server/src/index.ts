import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import passport from "passport";

const MongoDBStoreSession = MongoDBStore(session);

const logger = require("./utils/logger");
const config = require("./utils/config");

dotenv.config();

config.databaseConnection();

const store = new MongoDBStoreSession({
  uri: process.env.MONGO_URI,
  collection: "oauth-sessions",
});

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: config.Secret,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(config.Port, () => {
  logger.info(`Server running on http://localhost:${config.Port}`);
});
