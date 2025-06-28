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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

//model
export const Note = model<INotes>("Note", noteSchema);
