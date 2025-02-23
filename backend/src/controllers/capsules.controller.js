import Capsule from "../models/capsules.model.js";
import cloudinary from "../lib/cloudinary.js";
// Get all capsules
export const getCapsules = async (req, res) => {
  try {
    const capsules = await Capsule.find({ createdBy: req.user.id });

    if (!capsules || capsules.length === 0) {
      return res.status(404).json({ message: "No capsules found" });
    }

    // Convert file paths to full URLs
    const capsulesWithUrls = capsules.map((capsule) => ({
      ...capsule._doc,
      images: capsule.images.map(img => `${req.protocol}://${req.get("host")}/${img}`),
      videos: capsule.videos.map(vid => `${req.protocol}://${req.get("host")}/${vid}`),
    }));

    res.status(200).json(capsulesWithUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get a single capsule by ID
export const getCapsule = async (req, res) => {
  try { 
    const capsule = await Capsule.findById(req.params.id);
    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    // Convert file paths to full URLs
    const capsuleWithUrls = {
      ...capsule._doc,
      images: capsule.images.map(img => `${req.protocol}://${req.get("host")}/${img}`),
      videos: capsule.videos.map(vid => `${req.protocol}://${req.get("host")}/${vid}`),
    };

    res.status(200).json(capsuleWithUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Create a new capsule

export const createCapsule = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received files:", req.files); // ✅ Logs file uploads

    const { title, description, releaseDate } = req.body;
    const userId = req.user?.id;
    if (!title || !releaseDate) {
      return res.status(400).json({ message: "Title and Release Date are required" });
    }

    let imageUrl = [];
    let videoUrl = [];

    // **Check if files are correctly received**
    if (req.file) {
      console.log("File detected:", req.file);
    } else {
      console.log("No file uploaded");
    }

    // **Upload images to Cloudinary**
    if (req.files?.images) {
      console.log("Uploading image...");
      const uploadedImage = await cloudinary.uploader.upload(req.files.images[0].path, {
        folder: "capsule_images",
      });
      imageUrl.push(uploadedImage.secure_url);
    }
    console.log(imageUrl)
    // **Upload videos to Cloudinary**
    if (req.files?.videos) {
      console.log("Uploading video...");
      const uploadedVideo = await cloudinary.uploader.upload(req.files.videos[0].path, {
        folder: "capsule_videos",
        resource_type: "video",
      });
      videoUrl.push(uploadedVideo.secure_url);
    }
    console.log(videoUrl)

    console.log("Saving capsule to database...");
    const newCapsule = new Capsule({
      title,
      description,
      images: imageUrl,
      videos: videoUrl,
      createdBy: userId,
      openDate: new Date(),
      closeDate: new Date(releaseDate),
    });

    await newCapsule.save();
    console.log("Capsule saved successfully!");

    res.status(201).json({ message: "Capsule created successfully", capsule: newCapsule });
  } catch (error) {
    console.error("Error creating capsule:", error);
    res.status(500).json({ message: "Failed to create capsule", error: error.message });
  }
};



// Update a capsule
export const updateCapsule = async (req, res) => {
  try {
    const updatedCapsule = await Capsule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCapsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }
    res.status(200).json(updatedCapsule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a capsule
export const deleteCapsule = async (req, res) => {
  try {
    const deletedCapsule = await Capsule.findByIdAndDelete(req.params.id);
    if (!deletedCapsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }
    res.status(200).json({ message: "Capsule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
