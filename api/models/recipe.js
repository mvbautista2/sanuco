import pkg from "mongoose";
const { Schema, model } = pkg;

const RecipeSchema = new Schema({
  image: String,
  title: String,
  instructions: String,
  ingredients: String,
  amount: String,
  time: String,
  info: [],
  ingredient: String,
  video: String,
});

export default model("Recipe", RecipeSchema);
