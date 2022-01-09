import { Router } from "express";

import VitalSign from "../models/vitalSign.js";

const router = Router();

router.post("/api/vitalSigns/createnew", async (req, res) => {
  const {
    estatura,
    peso,
    masaCorporal,
    temperatura,
    frecuenciaCardiaca,
    frecuenciaRespiratoria,
    sistolica,
    diastolica,
    porcentajeGrasaCorporal,
    masaMuscular,
    saturacionOxigeno,
  } = req.body;

  try {
    const sign2 = new VitalSign({
      estatura,
      peso,
      masaCorporal,
      temperatura,
      frecuenciaCardiaca,
      frecuenciaRespiratoria,
      sistolica,
      diastolica,
      porcentajeGrasaCorporal,
      masaMuscular,
      saturacionOxigeno,
      user: req.body.user,
    });

    await sign2.save();
    return res.json(sign2);
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
