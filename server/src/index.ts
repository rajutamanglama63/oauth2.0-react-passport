import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import passport from "passport";
import User from "./User";
import { InterfaceMongoDBUser } from "./types";

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
  return done(null, user._id);
});

passport.deserializeUser(async (id: any, done: any) => {
  try {
    const user: InterfaceMongoDBUser = await User.findById(id);

    // whatever we return goes to client and binds with req.user property
    return done(null, user);
  } catch (error) {
    console.log("error on deserializeUser: ", error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      callbackURL: "/auth/google/callback",
    },

    // this function gets called on successfull authentication
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      // userDetectionOrCreation(profile, cb);
      console.log("profile: ", profile);
      // cb(null, profile);

      try {
        const userDoc = await User.findOne({ googleId: profile.id });
        if (!userDoc) {
          const newUser = new User({
            googleId: profile.id,
            username: profile.name.givenName,
          });

          await newUser.save();
          cb(null, newUser);
        } else {
          cb(null, userDoc);
        }
      } catch (error) {
        console.log("error from user creation: ", error);
        cb(error, null);
      }
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
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      console.log("profile: ", profile);
      // cb(null, profile);
      // save user in DB

      try {
        const userDoc = await User.findOne({ githubId: profile.id });
        console.log("user-doc: ", userDoc);
        if (!userDoc) {
          const newUser = new User({
            githubId: profile.id,
            username: profile.username,
          });

          await newUser.save();
          cb(null, newUser);
        } else {
          cb(null, userDoc);
        }
      } catch (error) {
        console.log("error from user creation: ", error);
        cb(error, null);
      }
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

app.get("/logout", (req, res) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) {
        console.log("Logout error: ", err);
        return res.status(500).send("Internal Server Error");
      }

      req.session.destroy(function (err) {
        if (err) {
          console.log("Session destroy error: ", err);
          return res.status(500).send("Internal Server Error");
        }

        res.send("done");
      });
    });
  } else {
    res.send("User not logged in");
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(config.Port, () => {
  logger.info(`Server running on http://localhost:${config.Port}`);
});
