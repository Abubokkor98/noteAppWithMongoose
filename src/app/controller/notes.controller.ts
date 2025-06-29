import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const notesRoutes = express.Router();

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
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

notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user"); // Populate user details
  res.status(200).json({
    success: true,
    data: notes,
  });
});

notesRoutes.get("/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);
  res.status(200).json({
    success: true,
    data: note,
  });
});

notesRoutes.patch("/:id", async (req: Request, res: Response) => {
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

notesRoutes.delete("/:id", async (req: Request, res: Response) => {
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
