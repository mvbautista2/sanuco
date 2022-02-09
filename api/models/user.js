import pkg from "mongoose";
const { Schema, model } = pkg;
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    id: String,
    given_name: String,
    family_name: String,
    birthday: Date,
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", UserSchema);
