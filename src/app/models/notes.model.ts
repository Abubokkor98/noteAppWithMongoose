import { model, Schema } from "mongoose";
import { INotes } from "../interfaces/note.interfaces";

//schemas
const noteSchema = new Schema<INotes>(
  {
    title: {
      type: String,
      required: true,
      trim: true, //  "    hello word   " //trim white space remove korbe
    },
    content: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["personal", "work", "study"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // User model er sathe reference
      required: true, // userId field is required
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//model
export const Note = model<INotes>("Note", noteSchema);
