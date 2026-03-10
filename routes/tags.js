import { Router } from "express";
import Tag from "../models/Tag.js";
import Task from "../models/Task.js";

const router = Router();

// GET all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.find().sort({ createdAt: 1 });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create tag
router.post("/", async (req, res) => {
  try {
    const { name, color } = req.body;
    const tag = await Tag.create({ name, color });
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE tag (also removes it from all tasks)
router.delete("/:id", async (req, res) => {
  try {
    await Task.updateMany({ tags: req.params.id }, { $pull: { tags: req.params.id } });
    await Tag.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
