import { Router } from "express";

import VitalSign from "../models/vitalSign.js";

const router = Router();

router.post("/", async (req, res) => {
  

  try {
    const user = new VitalSign({
      
      email: req.body.user,
    });

    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/api/vitalSigns", async (req, res) => {
  const signs = await VitalSign.find();
  return res.json(signs);
});

router.get("/api/vitalSigns/lastDate/:user", async (req, res) => {
  const lastSigns = await VitalSign.find({ user: req.params.user })
    .sort({ $natural: -1 })
    .limit(1);
  return res.json(lastSigns);
});

router.get("/api/vitalSigns/:user", async (req, res) => {
  const signsUser = await VitalSign.find({ user: req.params.user });
  return res.json(signsUser);
});

export default router;
