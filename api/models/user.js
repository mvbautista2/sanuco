import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema({
  email: String,
});

export default model("User", UserSchema);
