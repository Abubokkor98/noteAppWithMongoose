import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();
app.use(express.json());

//schemas
const noteSchema = new Schema(
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
const Note = model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  //approach - 1
  // const newNote = new Note({
  //   title: "Learning Mongoose",
  // content: "I am learning mongoose",
  // });
  // await newNote.save();

  //approach - 2
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    data: notes,
  });
});

app.get("/notes/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);
  res.status(200).json({
    success: true,
    data: note,
  });
});

app.patch("/noted/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const updatedBody = req.body;
  const updatedNote = await Note.findByIdAndUpdate(noteId, updatedBody, {
    new: true,
  });
  // const updatedNote = Note.findOneAndUpdate({ _id: noteId }, updatedBody, {
  //   new: true,
  // });
  // const updatedNote = Note.updateOne({ _id: noteId }, updatedBody, {
  //   new: true,
  // });
  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: updatedNote,
  });
});

app.delete("/noted/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const note = await Note.findByIdAndDelete(noteId);
  // const note = await Note.findOneAndDelete({_id: noteId});
  //   const note = await Note.deleteOne({_id: noteId});

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
    data: note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

export default app;
