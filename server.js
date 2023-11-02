import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import taskRoutes from "./Routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import http from 'http'; 
import { Server } from 'socket.io'; 
import { errorHandler, notFound } from "./Middlewares/errorHandler.js";



dotenv.config()
// Connect to the database
mongoose
  .connect("mongodb://localhost:27017/UserData", { family: 4 })
  .then(() => {
    console.log("Database Connected");
    startServer(); // Start the Express server after the database connection is established
  })
  .catch((err) => {
    console.error(err);
  });


//Server Start
function startServer() {
  const app = express();

   
  
  
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/api/tasks", taskRoutes);

  app.use(notFound);
  app.use(errorHandler);

  const server = app.listen(5000, () => {
    console.log("App is running on port 5000");
  });
  const io = new Server(server); 
  io.on('connection', (socket) => {
    console.log('A user connected');
  });
}
