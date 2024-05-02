import { ReciepeModel } from "../models/Recipes.js";
import express from "express";
import mongoose from "mongoose";
import { userModel } from "../models/users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await ReciepeModel.find({});
    res.json(response);
  } catch (e) {
    res.json(e);
  }
});

router.post("/", async (req, res) => {
  const recipe =  new ReciepeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (e) {
    res.json(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const recipe = await ReciepeModel.findById(req.body.recipeID);
    const user = await userModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (e) {
    res.json(e);
  }
});

router.get("/savedRecipes/ids", async () => {
  try {
    const user = await userModel.findById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/ ", async () => {
  try {
    const user = await userModel.findById(req.body.userID);
    const savedRecipes = await ReciepeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

export { router as recipesRouter };
