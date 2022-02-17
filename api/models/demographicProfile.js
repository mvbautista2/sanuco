import pkg from "mongoose";
const { Schema, model } = pkg;

const DemographicProfileSchema = new Schema(
  {
    sexo: String,
    durationPeriodoMenstrual: Number,
    durationCycloMenstrual: Number,
    menstrualIrregularities: String,
    description: String,
    breakfast: String,
    lunch: String,
    dinner: String,
    typicDay: String,
    idealWeight: Number,
    objectives: String,
    user: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("DemographicProfile", DemographicProfileSchema);
