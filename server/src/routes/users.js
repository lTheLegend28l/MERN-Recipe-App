import express from "express";
import passport from "passport";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/Users.js";

// Middleware config
dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, password: hashedPassword });
    const savedUser = await newUser.save();

    // Create jwt token
    const token = jwt.sign({ sub: savedUser._id }, process.env.secretOrKey, {
      expiresIn: "1h",
    });

    // Send response with token
    res.status(201).json({ token, userID: savedUser._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", (req, res, next) => {
  // Authenticate the user with local strategy
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Send jwt token to user
    const token = jwt.sign({ sub: user._id }, process.env.secretOrKey);
    return res.json({ token, userID: user._id });
  })(req, res, next);
});

export { router as userRouter };
