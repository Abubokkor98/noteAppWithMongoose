import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import { z } from "zod";
const bcrypt = require("bcrypt");

export const usersRoutes = express.Router();

const createUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  age: z.number(),
  password: z.string(),
  role: z.string().optional(), // role input is optional
});

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    // const body = await createUserZodSchema.parseAsync(req.body);
    // console.log("from zod",body);

    //method - 1 to create user
    // const body = req.body;
    // const user = await User.create(body);

    // method - 2 to create user
    const user = new User(req.body);
    const password = await user.hashPassword(user.password);
    user.password = password; // hash the password before saving
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
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
