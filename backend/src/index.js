import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import profileRoutes from "./routes/profile.route.js"; // Added profile routes
import capsuleRoutes from "./routes/capsules.route.js";
dotenv.config();
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is undefined
const __dirname = path.resolve();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());  
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // Added missing profile routes
app.use("/api/capsules", capsuleRoutes); // Added missing profile routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// 404 Handler (for undefined API routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Connect DB & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Database connection failed:", err.message);
});
