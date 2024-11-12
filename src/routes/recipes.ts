import express, { Request, Response } from "express";
import Recipe from "../models/Recipe";
import protect from "../middleware/protect";

const router = express.Router();

// Add a new recipe
router.post("/recipes", protect, async (req: Request, res: Response) => {
  const { title, ingredients, instructions, image } = req.body;

  const newRecipe = new Recipe({
    userId: req.user,
    title,
    ingredients,
    instructions,
    image,
  });

  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: "Error adding recipe" });
  }
});

// Get all recipes
router.get("/recipes", async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
