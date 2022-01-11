import { Router } from "express";
import Recipe from "../models/recipe.js";

const router = Router();

router.get("/api/recipes/search/:ingredient", async (req, res) => {
  const recipes = await Recipe.find({ ingredient: req.params.ingredient });
  return res.json(recipes);
});

router.get("/api/recipes/category/:category", async (req, res) => {
  const recipesCate = await Recipe.find({ category: req.params.category });
  return res.json(recipesCate);
});

router.get("/api/recipes/:_id", async (req, res) => {
  const recipesId = await Recipe.findById({ _id: req.params._id });
  return res.json(recipesId);
});

export default router;
