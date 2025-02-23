import express from "express";
import { updateProfile, updateLeaderboard, getProfile } from "../controllers/profile.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js"; // Import the User model
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Temp storage for files
const router = express.Router();
 
// Get the authenticated user's profile
router.get("/", protectRoute, getProfile);
 

router.patch("/update", protectRoute, upload.single("profilePic"), updateProfile);


// Update leaderboard stats
router.patch("/leaderboard", protectRoute, updateLeaderboard);

// Fetch leaderboard (sorted by SharedCapsuleCount)
router.get("/leaderboard", protectRoute, async (req, res) => {
  try {
    // Find all users, sort by SharedCapsuleCount descending, and select only relevant fields.
    const leaderboard = await User.find({})
      .sort({ SharedCapsuleCount: -1 })
      .limit(10)
      .select("fullName SharedCapsuleCount TimeCapsuleCount FriendsCount");

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
