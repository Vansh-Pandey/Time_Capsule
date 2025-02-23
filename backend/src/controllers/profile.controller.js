import mongoose from "mongoose";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const { TimeCapsuleCount = 0, SharedCapsuleCount = 0, FriendsCount = 0 } = req.body;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    console.log("Incoming stats:", { TimeCapsuleCount, SharedCapsuleCount, FriendsCount });

    // Increment stats only if provided
    user.timeCapsuleCount += Number(TimeCapsuleCount);
    user.sharedCapsuleCount += Number(SharedCapsuleCount);
    user.friendsCount += Number(FriendsCount);

    // ✅ Handle profile picture upload correctly
    if (req.file) {
      console.log("Uploading to Cloudinary...");
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "profile-pictures",
          width: 160,
          height: 160,
          crop: "fill",
        });

        console.log("Cloudinary Upload Success:", result.secure_url);
        user.profilePic = result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError.message);
        return res.status(500).json({ error: "Failed to upload profile picture." });
      }
    }

    await user.save();

    console.log("Updated profile:", {
      timeCapsuleCount: user.timeCapsuleCount,
      sharedCapsuleCount: user.sharedCapsuleCount,
      friendsCount: user.friendsCount,
      profilePic: user.profilePic,
    });

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: {
        id: user._id,
        Username: user.fullName,
        Email: user.email,
        TimeCapsuleCount: user.timeCapsuleCount,
        SharedCapsuleCount: user.sharedCapsuleCount,
        FriendsCount: user.friendsCount,
        profilePicture: user.profilePic || null,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};



export const updateLeaderboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const { sharedCapsuleCount, timeCapsuleCount } = req.body;

    // Build the update object.
    const updateData = {};
    if (typeof sharedCapsuleCount !== "undefined") {
      updateData.SharedCapsuleCount = sharedCapsuleCount;
    }
    if (typeof timeCapsuleCount !== "undefined") {
      updateData.TimeCapsuleCount = timeCapsuleCount;
    }

    // Update the user document.
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating leaderboard:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Get the authenticated user's profile.
 */
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Validate the user ID.
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID." });
    }

    // Find the user by ID and exclude the password field.
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Return the user's profile data, including the profile picture URL.
    return res.status(200).json({
      id: user._id,
      Username: user.fullName,
      Email: user.email,
      TimeCapsuleCount: user.timeCapsuleCount || 0,
      SharedCapsuleCount: user.sharedCapsuleCount || 0,
      FriendsCount: user.friendsCount || 0,
      profilePicture: user.profilePic || null, // Include the profile picture URL
    });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
};