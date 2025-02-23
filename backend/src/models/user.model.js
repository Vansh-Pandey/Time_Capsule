import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    timeCapsuleCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    friendsCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    sharedCapsuleCount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    profilePic: {
      type: String,
      default: "",
    },
    level:{
      type:Number,
      default:1,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
