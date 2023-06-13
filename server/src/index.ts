import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import passport from "passport";

const MongoDBStoreSession = MongoDBStore(session);
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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

passport.serializeUser((user: any, done: any) => {
  return done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  return done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "189333839030-p5d78mb77h59s9eg55sdqsvpmdknd5g8.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },

    // this function gets called on successfull authentication
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log("profile: ", profile);
      cb(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000");
  }
);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(config.Port, () => {
  logger.info(`Server running on http://localhost:${config.Port}`);
});
