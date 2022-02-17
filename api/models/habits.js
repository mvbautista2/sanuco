import pkg from "mongoose";
const { Schema, model } = pkg;

const HabitsSchema = new Schema(
  {
    acontecimiento: String,
    descripcionAcontecimiento: String,
    comerMismaHora: String,
    preparacionComida: String,
    pique: String,
    descripcionPique: String,
    preferencias: String,
    aversiones: String,
    ocupacion: String,
    necesidadDeComer: String,
    alcohol: String,
    user: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Habits", HabitsSchema);
