import { Router } from "express";
import Anamnesis from "../models/anamnesis.js";

const router = Router();

router.post("/api/anamnesis/createnew", async (req, res) => {
  const { antecedentesNoP, antecedentesP, antecedentesHeredo, alergias } =
    req.body;

  try {
    const anamnesis = new Anamnesis({
      antecedentesNoP,
      antecedentesP,
      antecedentesHeredo,
      alergias,
      user: req.body.user,
    });

    await anamnesis.save();
    return res.json(anamnesis);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/api/anamnesis/lastDate/:user", async (req, res) => {
  const lastAnamnesis = await Anamnesis.find({
    user: req.params.user,
  })
    .sort({ $natural: -1 })
    .limit(1);
  return res.json(lastAnamnesis);
});

export default router;
