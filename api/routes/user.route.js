import { Router } from "express";
import pkg from "mongoose";
import User from "../models/user.js";
import Role from "../models/role.js";
import { verifyToken, isNutricionista } from "../middlewares/authJwt.js";

const router = Router();

router.get(
  "/api/users/:role",
  verifyToken,
  isNutricionista,

  async (req, res) => {
    let role = req.params.role;

    const foundRole = await Role.findOne({ name: { $in: role } });
    role = foundRole.id;
    const users = await User.find({ role });
    return res.json(users);
  }
);

export default router;
