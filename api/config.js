import { config } from "dotenv";
config();

console.log(process.env.PORT);

export default {
  BucketName: process.env.BUCKET_NAME || "",
  Endpoint: process.env.ENDPOINT || "",
  SECRET: "sanuco-api",
};
