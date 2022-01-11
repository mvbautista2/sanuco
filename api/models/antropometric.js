import pkg from "mongoose";
const { Schema, model } = pkg;

const AntropometricSchema = new Schema(
  {
    id: String,
    estatura: Number,
    peso: Number,
    masaCorporal: Number,
    cintura: Number,
    cadera: Number,
    cinturaCadera: Number,
    sentimiento: String,
    user: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Antropometric", AntropometricSchema);
