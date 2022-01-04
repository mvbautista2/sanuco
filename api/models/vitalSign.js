import pkg from "mongoose";
const { Schema, model } = pkg;

const VitalSignSchema = new Schema(
  {
    id: String,
    estatura: Number,
    peso: Number,
    masaCorporal: Number,
    temperatura: Number,
    frecuenciaCardiaca: Number,
    frecuenciaRespiratoria: Number,
    sistolica: Number,
    diastolica: Number,
    porcentajeGrasaCorporal: Number,
    masaMuscular: Number,
    saturacionOxigeno: Number,
    user: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("VitalSign", VitalSignSchema);
