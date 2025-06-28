import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./controller/notes.controller";

const app: Application = express();
app.use(express.json());

//call note routes here
app.use("/notes", notesRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

export default app;
