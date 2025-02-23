import mongoose from "mongoose";

const capsuleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    videos: {
      type: [String],
      default: [],
    },
    isShared: {
      type: Boolean,
      default: false,
    },
    memoryCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    openDate: {
      type: Date,
      required: true,
    },
    closeDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Capsule = mongoose.model("Capsule", capsuleSchema);

export default Capsule;
