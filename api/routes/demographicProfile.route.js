import { Router } from "express";
import DemographicProfile from "../models/demographicProfile.js";

const router = Router();

router.post("/api/demographicProfile/createnew", async (req, res) => {
  const {
    sexo,
    durationPeriodoMenstrual,
    durationCycloMenstrual,
    menstrualIrregularities,
    description,
    breakfast,
    lunch,
    dinner,
    typicDay,
    idealWeight,
    objectives,
  } = req.body;

  try {
    const demographicProfile = new DemographicProfile({
      sexo,
      durationPeriodoMenstrual,
      durationCycloMenstrual,
      menstrualIrregularities,
      description,
      breakfast,
      lunch,
      dinner,
      typicDay,
      idealWeight,
      objectives,
      user: req.body.user,
    });

    await demographicProfile.save();
    return res.json(demographicProfile);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get("/api/demographicProfile/lastDate/:user", async (req, res) => {
  const lastDemographic = await DemographicProfile.find({
    user: req.params.user,
  })
    .sort({ $natural: -1 })
    .limit(1);
  return res.json(lastDemographic);
});

export default router;
