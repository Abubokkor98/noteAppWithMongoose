import { Model, model, Schema } from "mongoose";
import validator from "validator";
import {
  IAddress,
  IUser,
  UserInstanceMethods,
  UserStaticMethods,
} from "../interfaces/user.interfaces";
import { Note } from "./notes.model";
const bcrypt = require("bcrypt");

// embedding address schema
// This is a sub-document schema for address
// It can be used to store address information within the user document
// This is an example of embedding a schema in Mongoose
// It allows you to create a nested structure within the user document
const addressSchema = new Schema<IAddress>(
  {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    zip: {
      type: Number,
    },
  },
  {
    _id: false, // prevents Mongoose from creating an _id field for this sub-document
  }
);

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>(
  {
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
    address: {
      type: addressSchema, // embedding address schema
    },
  },
  {
    versionKey: false, // disables the __v field
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// Static method to hash password
userSchema.static("hashPassword", async function (plainPassword: string) {
  const password = await bcrypt.hash(plainPassword, 10);
  return password;
});

// pre-save hook
// This hook is called before saving a user document
// It can be used to perform actions like hashing the password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  // console.log("inside pre save hook");
  next();
});

// pre find hook (query middleware)
// This hook is called before finding user documents
// It can be used to perform actions like logging or modifying the query
userSchema.pre("find", function (next) {
  console.log("from find pre middleware");
  next();
});

// post-save hook (document middleware)
// This hook is called after saving a user document
// It can be used to perform actions like logging or sending notifications
userSchema.post("save", function (doc, next) {
  console.log("inside post save hook", doc);
  next();
});

//post findOneAndDelete hook (query middleware)
// This hook is called after deleting a user document
// It can be used to perform actions like deleting related documents
userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    // console.log("from delete doc post middleware", doc);
    await Note.deleteMany({ user: doc._id });
  }
  next();
});

export const User = model<IUser, UserStaticMethods>("User", userSchema);
