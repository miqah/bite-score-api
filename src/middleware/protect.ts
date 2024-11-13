import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const secret = process.env.JWT_SECRET;

  try {
    const decoded: any = jwt.verify(token, secret || '');
    req.user = decoded.id; // Attach user ID to request
    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
