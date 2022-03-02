import { Router } from "express";
import Video from "../models/video.js";

const router = Router();

router.get("/api/videos/:category", async (req, res) => {
  const video = await Video.find({ category: req.params.category });
  return res.json(video);
});

router.get("/api/videos/search/:type", async (req, res) => {
  const videoType = await Video.find({ type: req.params.type });
  return res.json(videoType);
});

export default router;
