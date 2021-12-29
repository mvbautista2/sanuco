import { Router } from "express";
import AWS from "aws-sdk";
import config from "../config.js";

const router = Router();

import File from "../models/file.js";

const spacesEndpoint = new AWS.Endpoint(config.Endpoint);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
});

router.post("/api/files/upload", async (req, res) => {
  const { file } = req.files;
  console.log(file);

  try {
    await s3
      .putObject({
        ACL: "public-read",
        Bucket: config.BucketName,
        Body: file.data,
        Key: file.name,
      })
      .promise();

    const urlFile = `https://${config.BucketName}.${config.Endpoint}/${file.name}`;

    const file2 = new File({
      url: urlFile,
      key: file.name,
      title: req.body.title,
      user: req.body.user,
    });

    await file2.save();
    return res.json(file2);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.get("/api/files/:user", async (req, res) => {
  const files = await File.find({user: req.params.user});
  return res.json(files);
});
router.get("/api/files/:id", async (req, res) => {
  const fil = await File.findById(req.params.id);
  return res.json(fil);
});
router.delete("/api/files/:id", async (req, res) => {
  const deleteFile = await File.findByIdAndDelete(req.params.id);

  await s3
    .deleteObject({
      Bucket: config.BucketName,
      Key: deleteFile.key,
    })
    .promise();

  res.json(deleteFile);
});
export default router;
