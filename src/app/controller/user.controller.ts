import express, { Request, Response } from "express";
import { User } from "../models/user.model";

export const usersRoutes = express.Router();

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

usersRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
});

usersRoutes.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  res.status(200).json({
    success: true,
    message: "All User retrieved successfully",
    data: user,
  });
});

usersRoutes.patch("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const updatedBody = req.body;
  const updatedUser = await User.findByIdAndUpdate(userId, updatedBody, {
    new: true,
  });
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

usersRoutes.delete("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);

  res.status(200).json({
    success: true,
    message: "user deleted successfully",
    data: user,
  });
});
