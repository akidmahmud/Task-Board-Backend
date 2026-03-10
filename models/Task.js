import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title:      { type: String, required: true, trim: true },
  dev:        { type: String, enum: ["Akid", "Emon"], required: true },
  type:       { type: String, enum: ["BE", "FE", "BOTH"], required: true },
  phaseId:    { type: String, required: true },
  module:     { type: String, required: true },
  tags:       [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  done:       { type: Boolean, default: false },
  order:      { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
