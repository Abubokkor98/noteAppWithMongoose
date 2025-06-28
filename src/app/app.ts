import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

//schemas
const noteSchema = new Schema({
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
});

//model
const Note = model("Note", noteSchema);

app.post("/create-note", async (req: Request, res: Response) => {
  const newNote = new Note({
    title: "Learning Mongoose",
    // content: "I am learning mongoose",
  });

  await newNote.save();
  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: newNote,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    data: notes,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

export default app;
