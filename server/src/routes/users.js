import express from "express";
import * as dotenv from "dotenv";
import passport from "passport";
import { User } from "../models/Users.js";
import flash from "connect-flash";

// Middleware config
dotenv.config();

const router = express.Router();

// /auth/register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username: username });

  // register user
  User.register(user, password, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    } else {
      console.log("User registered successfully");
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("User logged in");
      return res.json({ message: "User authenticated successfully" });
    });
  })(req, res, next);
});

// router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), function(req, res) {
//   res.redirect("http://localhost:3000/");
// });

router.post("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error occurred on logout" });
    } else {
      res.json({ message: "User logged out successfully" });
      console.log("User logged out");
    }
  });
});

router.post("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

export { router as userRouter };