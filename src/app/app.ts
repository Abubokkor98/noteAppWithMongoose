import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./controller/notes.controller";
import { usersRoutes } from "./controller/user.controller";

const app: Application = express();
app.use(express.json());

//call note routes here
app.use("/notes", notesRoutes);
//call notes routes
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

export default app;
