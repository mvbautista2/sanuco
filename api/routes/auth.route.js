import { Router } from "express";
import User from "../models/user.js";
import { transporter } from "../middlewares/mailer.js";
import pkg from "jsonwebtoken";
const { jwt } = pkg;
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import config from "../config.js";
import Role from "../models/role.js";
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifySignup.js";

const router = Router();
const client = new OAuth2Client(
  "362449996279-6tog3bo75fspopbn3dhf3fmjrt8s4lik.apps.googleusercontent.com"
);

router.post("/api/auth/signin", async (req, res) => {
  const userFound = await User.findOne({
    username: req.body.username,
  }).populate("role");

  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid Password" });

  const token = pkg.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });
  console.log(userFound);

  res.json({ token, userFound });
});

router.post(
  "/api/auth/signup",
  checkDuplicateUsernameOrEmail,
  async (req, res) => {
    const {
      username,
      given_name,
      family_name,
      email,
      birthday,
      picture,
      password,
      role,
      address,
      phone,
      sex,
      verified,
    } = req.body;

    const newUser = new User({
      username,
      given_name,
      family_name,
      email,
      birthday,
      picture,
      address,
      phone,
      sex,
      verified: false,
      password: await User.encryptPassword(password),
    });

    if (role) {
      const foundRole = await Role.findOne({ name: { $in: role } });
      newUser.role = foundRole.id;
    } else {
      const role = await Role.findOne({ name: "Paciente" });
      newUser.role = role._id;
    }

    const userFound = await newUser.save();
    console.log(await userFound.populate("role"));
    const token = pkg.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, //24 horas
    });
    res.status(200).json({ token, userFound });   

    // try {
    //   verificationLink = `http:localhost:3000/admin/verify/${token}`;
    //   await transporter.sendMail({
    //     from: '"Sanuco"<valentina1999bautista@gmail.com>',
    //     to: userFound.email,
    //     subjet: "Verificación de correo electrónico",
    //     html: `
    //     <b> Por favor da clic en el siguiente enlace o copialo en tu navegador para continuar en Sanuco: </b>
    //     <a href="${verificationLink}">Enlace de verificación</a>
    //     `,
    //   });
    // } catch (error) {
    //   // return res.status(400).json({ message: "Algo ha salido mal" });
    // }
  }
);

router.post("/api/googlelogin", async (req, res) => {
  const { tokenId } = req.body;
  const roles = await Role.findOne({ name: "Ninguno" });
  const role = roles._id;
  console.log(role);
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "362449996279-6tog3bo75fspopbn3dhf3fmjrt8s4lik.apps.googleusercontent.com",
    })
    .then(async (response) => {
      const { email_verified, email, given_name, family_name, picture } =
        response.payload;
      console.log(picture);

      if (email_verified) {
        User.findOne({ email })
          .populate("role")
          .exec((err, userFound) => {
            if (userFound) {
              const token = pkg.sign({ id: userFound._id }, config.SECRET, {
                expiresIn: 86400,
              });
              res.status(200).json({ token, userFound });
            } else {
              const password = email + config.SECRET;
              const userFound = new User({
                given_name,
                family_name,
                email,
                password,
                picture,
                role,
              });

              const savedUser = userFound.save();
              savedUser.then(function (result) {
                const rest = result.populate("role");
                rest.then(function (userFound) {
                  console.log(userFound);
                  const token = pkg.sign({ id: savedUser._id }, config.SECRET, {
                    expiresIn: 86400, //24 horas
                  });
                  res.status(200).json({ token, userFound });
                });
              });
            }
          });
      }
    });
});

router.post("/api/facebooklogin", async (req, res) => {
  const { userID, accessToken } = req.body;
  const roles = await Role.findOne({ name: "Ninguno" });
  const role = roles._id;
  console.log(role);
  let urlGraphFacebook = `https://graph.facebook.com/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((response) => response.json())
    .then(async (response) => {
      const { email, name, picture } = response;
      User.findOne({ email })
        .populate("role")
        .exec((err, userFound) => {
          if (userFound) {
            const token = pkg.sign({ id: userFound._id }, config.SECRET, {
              expiresIn: 86400,
            });
            res.status(200).json({ token, userFound });
          } else {
            const password = email + config.SECRET;
            const userFound = new User({
              given_name: name,
              family_name: name,
              email,
              password,
              picture: picture.data.url,
              role,
            });

            const savedUser = userFound.save();
            savedUser.then(function (result) {
              const rest = result.populate("role");
              rest.then(function (userFound) {
                // console.log(userFound);
                const token = pkg.sign({ id: savedUser._id }, config.SECRET, {
                  expiresIn: 86400, //24 horas
                });
                res.status(200).json({ token, userFound });
              });
            });
          }
        });
    });
});

router.put("/api/auth/user/:email", async (req, res) => {
  let { role } = req.body;
  if (role) {
    const foundRole = await Role.findOne({ name: { $in: role } });
    role = foundRole.id;
  } else {
    const role = await Role.findOne({ name: "Paciente" });
    role = role._id;
  }
  await User.findOneAndUpdate(
    { email: req.params.email },
    {
      role,
    }
  );
  res.json(role);
});

export default router;
