import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import path from "path";
import axios from "axios";
//require("dotenv").config();
import fileUpload from "express-fileupload";
import filesRoute from "./routes/files.route.js";
import recipesRoute from "./routes/recipes.route.js";
import vitalSignsRoute from "./routes/vitalSigns.route.js";
import antropometricRoute from "./routes/antropometric.route.js";

import config from "./config.js";

import "./database.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Middleware
const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-diwwh35w.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "este es un identificador unico",
  issuer: "https://dev-diwwh35w.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/"] });

app.use(
  fileUpload({
    tempFileDir: "/temp",
  })
);
app.use(filesRoute);
app.use(recipesRoute);
app.use(vitalSignsRoute);
app.use(antropometricRoute);
//app.use(verifyJwt);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Internal server error";
  res.status(status).send(message);
});

app.listen(4000, () => console.log("Server on port 4000"));
