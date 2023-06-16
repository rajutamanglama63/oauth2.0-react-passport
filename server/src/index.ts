import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import passport from "passport";

const MongoDBStoreSession = MongoDBStore(session);
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

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
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },

    // this function gets called on successfull authentication
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log("profile: ", profile);
      cb(null, profile);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: `${process.env.GITHUB_CLIENT_ID}`,
      clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },

    // this function gets called on successfull authentication
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      console.log("profile: ", profile);
      cb(null, profile);
    }
  )
);

// for google strategy route
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

// for github strategy route
app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

app.get("/getauthuser", (req, res) => {
  res.send(req.user);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(config.Port, () => {
  logger.info(`Server running on http://localhost:${config.Port}`);
});
