import { Router } from "express";

import Antropometric from "../models/antropometric.js";

const router = Router();

router.post("/api/antropometric/createnew", async (req, res) => {
  const { estatura, peso, cintura, cadera, sentimiento } = req.body;
  const masaCorporal = (peso / (estatura * estatura)).toFixed(1);
  const cinturaCadera = (cintura / cadera).toFixed(1);

  try {
    const antro2 = new Antropometric({
      estatura,
      peso,
      masaCorporal,
      cintura,
      cadera,
      cinturaCadera,
      sentimiento,
      user: req.body.user,
    });

    await antro2.save();
    return res.json(antro2);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/api/antropometric", async (req, res) => {
  const antro = await Antropometric.find();
  return res.json(antro);
});

router.get("/api/antropometric/lastDate/:user", async (req, res) => {
  const lastAntro = await Antropometric.find({ user: req.params.user })
    .sort({ $natural: -1 })
    .limit(1);
  return res.json(lastAntro);
});

router.get("/api/antropometric/:user", async (req, res) => {
  const antroUser = await Antropometric.find({ user: req.params.user });
  return res.json(antroUser);
});

export default router;
