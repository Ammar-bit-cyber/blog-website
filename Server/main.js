import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { blogs } from "./models/blogscheme.js";
import { requireAuth, registerAuthRoutes } from "./auth.js";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.join(__dirname, "../App/dist");


try {
 await mongoose.connect(process.env.MONGODB_URI);
  console.log("Mongo connected");

} catch (error) {
  console.error(error);
}

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

registerAuthRoutes(app);

app.post('/add', requireAuth, async (req, res) => {
  try {
    const newblog = await blogs.create(req.body);
    res.status(201).json(newblog);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create blog"
    });
  }
});


app.get('/blogs', async (req, res) => {
  const allblog = await blogs.find().sort({ date: -1 });
  res.json(allblog);
})

app.put('/blogs/:id', requireAuth, async (req, res) => {
  try {
    const updated = await blogs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update blog" });
  }
});

app.delete('/blogs/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await blogs.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

// fallthrough: true lets unknown paths reach SPA handler (React Router)
app.use(express.static(frontendDist, { fallthrough: true }));

app.get(/^(?!\/blogs$|\/add$).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 