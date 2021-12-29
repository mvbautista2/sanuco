import pkg from "mongoose";
const { Schema, model } = pkg;

const FileSchema = new Schema(
  {
    id: String,
    title: String,
    key: String,
    url: {
      type: String,
      required: true,
    },
    user: String,
  },
  {
    timestamps: true,
    versionKey: false,
  });

export default model("File", FileSchema);
