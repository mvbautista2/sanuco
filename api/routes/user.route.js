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

router.get("/api/userInfo/:email", async (req, res) => {
  const userInfo = await User.find({ email: req.params.email });
  return res.json(userInfo);
});

router.put("/api/user/:email", async (req, res) => {
  const { username, given_name, family_name, birthday, address, phone, sex } =
    req.body;
  await User.findOneAndUpdate(
    { email: req.params.email },
    {
      username,
      given_name,
      family_name,
      birthday,
      address,
      phone,
      sex,
    }
  );
  res.json({ message: "User updated" });
});

export default router;
