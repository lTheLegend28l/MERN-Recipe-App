import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/Users.js";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

// Middleware Config
// Dotenv
dotenv.config();
const password = process.env.password;

// Express
const app = express();
app.use(express.json());
app.use(cors());

// Passport
app.use(passport.initialize());

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.secretOrKey,
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
        const isMatch = bcrypt.compare(password, user.password);
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

app.use("/auth", userRouter);
app.use(
  "/recipes",
  passport.authenticate("jwt", { session: false }),
  recipesRouter
);

async function main() {
  await mongoose.connect(
    `mongodb+srv://pradyuntandra:${password}@recipes.fasj8m7.mongodb.net/recipes?retryWrites=true&w=majority`
  );
}

main();

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});