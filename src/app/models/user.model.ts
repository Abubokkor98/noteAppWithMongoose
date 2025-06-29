import { model, Schema } from "mongoose";
import validator from "validator";
import { IUser } from "../interfaces/user.interfaces";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "First name is required"], //custom error message
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
    unique: [true, "email already exist"],
    // validate: {
    //   validator: function (value) {
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   },
    //   message: function (props) {
    //     return `Email ${props.value} is not valid email`;
    //   },
    // },
    validator: [validator.isEmail, "Please enter a valid email address"], //validator from validator library
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
    enum: {
      values: ["admin", "user"],
      message: "{VALUE} is not a valid role", //custom error message
    },
    default: "user",
  },
});

export const User = model("User", userSchema);
