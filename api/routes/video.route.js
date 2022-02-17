import { Router } from "express";
import Video from "../models/video.js";

const router = Router();

router.get("/api/videos/:category", async (req, res) => {
  const video = await Video.find({ category: req.params.category });
  return res.json(video);
});

export default router;
