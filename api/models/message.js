import pkg from "mongoose";
const { Schema, model } = pkg;

const MessagesSchema = new Schema(
  {
    nutricionista: String,
    user: String,
    title: String,
    content: String,
    imageURL: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Messages", MessagesSchema);
