const { jwt } = pkg;
import pkg from "jsonwebtoken";
import config from "../config.js";
import User from "../models/user.js";
import Role from "../models/role.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];

    console.log(token);

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = pkg.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    console.log(user);
    if (!user) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const isNutricionista = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const role = await Role.findOne({ _id: user.role });
  console.log(role.name);
  if (role.name === "Nutricionista") {
    next();
    return;
  }
  return res.status(403).json({
    message: "Requires a 'Nutricionista' role to perform this action",
  });
};
