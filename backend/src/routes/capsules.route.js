import express from "express";
import { 
  getCapsules, 
  getCapsule, 
  createCapsule, 
  updateCapsule, 
  deleteCapsule 
} from "../controllers/capsules.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" }); // Temp storage for files
const router = express.Router();

router.get("/", protectRoute, getCapsules);
router.get("/:id", protectRoute, getCapsule);
router.post("/", protectRoute, upload.fields([
  { name: "images", maxCount: 10 }, 
  { name: "videos", maxCount: 10 }
]), createCapsule);

router.put("/:id", protectRoute, updateCapsule);
router.delete("/:id", protectRoute, deleteCapsule);

export default router;
