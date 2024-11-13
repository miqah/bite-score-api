import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import cors from "cors";
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";
import recipeRoutes from "./routes/recipes";
import createTempUsers from "./utils/setup";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for a specific origin
const corsOptions = {
  origin: "https://miqah.github.io", // or the full URL: https://miqah.github.io/bite-score-app/
  methods: "GET,POST,PUT,DELETE", // Adjust methods as needed
};

app.use(cors(corsOptions)); // Use CORS with specified options
app.use(express.json());

// Connect to MongoDB
connectDB();
createTempUsers();

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", recipeRoutes);

// Sample route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});