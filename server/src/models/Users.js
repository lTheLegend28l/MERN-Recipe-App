import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  savedRecipes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "recipes"
  }]
});

userSchema.plugin(passportLocalMongoose);

export const User = mongoose.model("User", userSchema);
