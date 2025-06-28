import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = 5000;

async function main() {
  //
  try {
    //step-1: connect mongoose
    await mongoose.connect(
      "mongodb+srv://noteapp:3rqKXiiHdOZklfir@cluster0.4nvaj.mongodb.net/note-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to mongoDB using mongoose");

    //step-2: connect server
    server = app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
