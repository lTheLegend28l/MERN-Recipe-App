import express from "express";
import { Recipe } from "../models/Recipes.js";
import { User } from "../models/Users.js";

// Middleware config
const router = express.Router();

// Get all recipes and send to frontend
router.get("/", async (req, res) => {
  try {
    const response = await Recipe.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Handle post request to make a new recipe
router.post("/", async (req, res) => {
  const recipe = new Recipe({ ...req.body });
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Handle saving a recipe into the user's saved recipes
router.put("/", async (req, res) => {
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
});

// Handle finding object ids of saved recipes for a specific user
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await User.findById(userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

// Handle finding saved recipes for a specific user
router.get("/savedRecipes/:userID", async (req, res) => {
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
});

export { router as recipesRouter };
