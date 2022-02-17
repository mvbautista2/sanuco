import pkg from "mongoose";
const { Schema, model } = pkg;

const BehaviorSchema = new Schema(
    {
        sentirseGordo: Number,
        temorSubirdePeso: Number,
        autoestima: Number,
        verguenzaPorComer: Number,
        dietasEspeciales: Number,
        grandesCantidadesComida: Number,
        esconderComida: Number,
        mentirHabitos: Number,
        restringirComida: Number,
        vomito: Number,
        diureticos: Number,
        ejercicio:Number,
        comerEvitarAnsiedad: Number,
        comerSinHambre: Number,
        verguezaPeso: Number,
        comerControlarSentimientos: Number,
        ayuna: Number,
        problemasEstomacales: Number,
        animoPorPeso: Number,
        total: Number,
        user: String,

    },
    {
        timestamps: true,
        versionKey: false,
      }
    )

    export default model("Behavior", BehaviorSchema);