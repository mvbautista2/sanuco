import { Router } from "express";

import Behavior from "../models/behavior.js";

const router = Router();

router.post("/api/behavior/createnew", async (req, res) => {
  const {
    sentirseGordo,
    temorSubirdePeso,
    autoestima,
    verguenzaPorComer,
    dietasEspeciales,
    grandesCantidadesComida,
    esconderComida,
    mentirHabitos,
    restringirComida,
    vomito,
    diureticos,
    ejercicio,
    comerEvitarAnsiedad,
    comerSinHambre,
    verguezaPeso,
    comerControlarSentimientos,
    ayuna,
    problemasEstomacales,
    animoPorPeso,
  } = req.body;
  const total =
    parseInt(sentirseGordo) +
    parseInt(temorSubirdePeso) +
    parseInt(autoestima) +
    parseInt(verguenzaPorComer) +
    parseInt(dietasEspeciales) +
    parseInt(grandesCantidadesComida) +
    parseInt(esconderComida) +
    parseInt(mentirHabitos) +
    parseInt(restringirComida) +
    parseInt(vomito) +
    parseInt(diureticos) +
    parseInt(ejercicio) +
    parseInt(comerEvitarAnsiedad) +
    parseInt(comerSinHambre) +
    parseInt(verguezaPeso) +
    parseInt(comerControlarSentimientos) +
    parseInt(ayuna) +
    parseInt(problemasEstomacales) +
    parseInt(animoPorPeso);

  try {
    const behavior = new Behavior({
      sentirseGordo,
      temorSubirdePeso,
      autoestima,
      verguenzaPorComer,
      dietasEspeciales,
      grandesCantidadesComida,
      esconderComida,
      mentirHabitos,
      restringirComida,
      vomito,
      diureticos,
      ejercicio,
      comerEvitarAnsiedad,
      comerSinHambre,
      verguezaPeso,
      comerControlarSentimientos,
      ayuna,
      problemasEstomacales,
      animoPorPeso,
      total,
      user: req.body.user,
    });

    await behavior.save();
    return res.json(behavior);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/api/behavior/lastDate/:user", async (req, res) => {
  const lastBehavior = await Behavior.find({ user: req.params.user })
    .sort({ $natural: -1 })
    .limit(1);
  return res.json(lastBehavior);
});

export default router;
