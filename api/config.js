import { config } from "dotenv";
config();

console.log(process.env.PORT);

export default {
  BucketName: process.env.BUCKET_NAME || "",
  Endpoint: process.env.ENDPOINT || "",
  SECRET: "sanuco-api",
  AUTH_EMAIL: process.env.AUTH_EMAIL,
  AUTH_PASS: process.env.AUTH_PASS,
};
