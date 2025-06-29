import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interfaces";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "First name must be at least 3 characters"], //custom error message
    maxlength: 15,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  age: {
    type: Number,
    min: [18, "Age must be at least 18"],
    max: 120,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export const User = model("User", userSchema);
