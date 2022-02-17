import { Router } from "express";
import Habits from "../models/habits.js";

const router = Router();

router.post("/api/habits/createnew", async (req, res) => {
  const {
    acontecimiento,
    descripcionAcontecimiento,
    comerMismaHora,
    preparacionComida,
    pique,
    descripcionPique,
    preferencias,
    aversiones,
    ocupacion,
    necesidadDeComer,
    alcohol,
  } = req.body;

  try {
    const habits = new Habits({
      acontecimiento,
      descripcionAcontecimiento,
      comerMismaHora,
      preparacionComida,
      pique,
      descripcionPique,
      preferencias,
      aversiones,
      ocupacion,
      necesidadDeComer,
      alcohol,
      user: req.body.user,
    });

    await habits.save();
    return res.json(habits);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/api/habits/lastDate/:user", async (req, res) => {
  const lastHabits = await Habits.find({
    user: req.params.user,
  })
    .sort({ $natural: -1 })
    .limit(1);
  return res.json(lastHabits);
});

export default router;
