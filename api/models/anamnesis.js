import pkg from "mongoose";
const { Schema, model } = pkg;

const AnamnesisSchema = new Schema(
    {
        antecedentesNoP: String,
        antecedentesP: String,
        antecedentesHeredo: String,
        alergias: String,
        user: String,
    },
    {
        timestamps: true,
        versionKey: false,
      }
    )

    export default model("Anamnesis", AnamnesisSchema);
