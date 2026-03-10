import { Router } from "express";
import Task from "../models/Task.js";

const router = Router();

// GET all tasks (with tags populated)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().populate("tags").sort({ order: 1, createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create task
router.post("/", async (req, res) => {
  try {
    const { title, dev, type, phaseId, module, tags, order } = req.body;
    const task = await Task.create({ title, dev, type, phaseId, module, tags: tags || [], order: order ?? 1000 });
    await task.populate("tags");
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update task (done toggle, tags update, etc.)
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate("tags");
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
