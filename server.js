import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks.js";
import tagRoutes from "./routes/tags.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/tags", tagRoutes);

app.get("/", (req, res) => res.json({ status: "ok" }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
