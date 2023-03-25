import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
// import flash from "connect-flash";
import { User } from "./models/Users.js";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

// Middleware Config
dotenv.config();
const password = process.env.password;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    console.log("Serialize user " + user);
    cb(null, { id: user.id, username: user.username });
  });
});
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    console.log("Deserialize user " + user);
    return cb(null, user);
  });
});

// add this middleware to set currentUser in res.locals
// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   console.log("Req.user from INDEX.JS", req.user);
//   next();
// });

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

async function main () {
  await mongoose.connect(
    `mongodb+srv://pradyuntandra:${password}@recipes.fasj8m7.mongodb.net/recipes?retryWrites=true&w=majority`
  );
}

main();

// Server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
