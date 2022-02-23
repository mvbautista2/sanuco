import pkg from "mongoose";
const { Schema, model } = pkg;
import mongooseDateFormat from "mongoose-date-format";

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

AntropometricSchema.plugin(mongooseDateFormat);
export default model("Antropometric", AntropometricSchema);
