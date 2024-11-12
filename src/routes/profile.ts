import express, { Request, Response } from "express";
import User from "../models/User";
import protect from "../middleware/protect";

const router = express.Router();

// Get user profile
router.get("/profile", protect, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
