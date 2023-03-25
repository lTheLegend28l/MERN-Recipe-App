import express from "express";
import passport from "passport";
import { Recipe } from "../models/Recipes.js";
import { User } from "../models/Users.js";

// Middleware config
const router = express.Router();

// Get all recipes and send to frontend
router.get("/", passport.authenticate('local', { failureRedirect: "http://localhost:3000/auth" }), async (req, res) => {
    try {
        const response = await Recipe.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})

// Handle post request to make a new recipe
router.post("/", passport.authenticate('local', { failureRedirect: "http://localhost:3000/auth" }), async (req, res) => {
    if (req.isAuthenticated()) {
        console.log("Recipes.js: Request is authenticated");
    } else {
        console.log("Recipes.js: Request is not authenticated");
    }
    console.log("Recipes.js req.user: " + req.user);
    const recipe = new Recipe({...req.body, userOwner: req.user["__id"]});
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
})

// Handle saving a new recipe
router.put("/", passport.authenticate('local', { failureRedirect: "http://localhost:3000/auth" }), async (req, res) => {
    const {userId, recipeId} = req.body;
    try {
        const recipe = await Recipe.findById(recipeId);
        const user = await User.findById(userId);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
    } catch (err) {
        res.json(err);
    }
})

// Handle finding object ids of saved recipes for a specific user
router.get("/savedRecipes/ids", passport.authenticate('local', { failureRedirect: "http://localhost:3000/auth" }), async (req, res) => {
    const {userId} = req.body;
    try {
        const user = await User.findById(userId);
        res.json({savedRecipes: user?.savedRecipes});
    } catch (err) {
        res.json(err);
    }
})

// Handle finding saved recipes for a specific user
router.get("/savedRecipes", passport.authenticate('local', { failureRedirect: '/login' }), async (req, res) => {
    const {userId} = req.body;
    try {
        const user = await User.findById(userId);
        // Find recipes which have the corresponding recipe ids from user.savedRecipes
        const savedRecipes = await Recipe.find({
            __id: { $in: user.savedRecipes}
        });
        res.json({savedRecipes});
    } catch (err) {
        res.json(err);
    }
})

export {router as recipesRouter};