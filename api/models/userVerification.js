import pkg from "mongoose";
const { Schema, model } = pkg;

const UserVerificationSchema = new Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

export default model("UserVerification", UserVerificationSchema);
