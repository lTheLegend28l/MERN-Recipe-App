import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/Users.js";
import { Recipe } from "./models/Recipes.js";
import jwt from "jsonwebtoken";

// Middleware Config
const password = process.env.PASSWORD;

// Express
const app = express();
app.use(express.json());
app.use(cors());

// Passport
app.use(passport.initialize());

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETORKEY,
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload.sub }).exec();
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  })
);

passport.use(
  new LocalStrategy(
    {
      username: "username",
      password: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect email or password" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

// User routes
app.post("/auth/register", async (req, res) => {
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
    const token = jwt.sign({ sub: savedUser._id }, process.env.SECRETORKEY, {
      expiresIn: "1h",
    });

    // Send response with token
    res.status(201).json({ token, userID: savedUser._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/auth/login", (req, res, next) => {
  // Authenticate the user with local strategy
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Send jwt token to user
    console.log("SECRETORKEY: " + process.env.SECRETORKEY);
    const token = jwt.sign({ sub: user._id }, process.env.SECRETORKEY);
    return res.json({ token, userID: user._id });
  })(req, res, next);
});

// Recipes routes
// Get all recipes and send to frontend
app.get(
  "/recipes/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await Recipe.find({});
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  }
);

// Handle post request to make a new recipe
app.post(
  "/recipes/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const recipe = new Recipe({ ...req.body });
    try {
      const response = await recipe.save();
      res.json(response);
    } catch (err) {
      res.json(err);
    }
  }
);

// Handle saving a recipe into the user's saved recipes
app.put(
  "/recipes/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userID, recipeID } = req.body;
    try {
      const recipe = await Recipe.findById(recipeID);
      const user = await User.findById(userID);
      user.savedRecipes.push(recipe);
      await user.save();
      res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
      res.json(err);
    }
  }
);

// Handle finding object ids of saved recipes for a specific user
app.get(
  "/recipes/savedRecipes/ids/:userID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userID } = req.params;
    try {
      const user = await User.findById(userID);
      res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
      res.json(err);
    }
  }
);

// Handle finding saved recipes for a specific user
app.get(
  "/recipes/savedRecipes/:userID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userID } = req.params;
    try {
      const user = await User.findById(userID);
      // Find recipes which have the corresponding recipe ids from user.savedRecipes
      const savedRecipes = await Recipe.find({
        _id: { $in: user.savedRecipes },
      });
      res.json({ savedRecipes });
    } catch (err) {
      res.json(err);
    }
  }
);

async function main() {
  await mongoose.connect(
    `mongodb+srv://pradyuntandra:${password}@recipes.fasj8m7.mongodb.net/recipes?retryWrites=true&w=majority`
  );
}

main();

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
