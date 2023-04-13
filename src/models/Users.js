import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  savedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipes",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
