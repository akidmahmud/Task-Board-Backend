import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name:  { type: String, required: true, unique: true, trim: true },
  color: { type: String, required: true, default: "#6366f1" },
}, { timestamps: true });

export default mongoose.model("Tag", tagSchema);
