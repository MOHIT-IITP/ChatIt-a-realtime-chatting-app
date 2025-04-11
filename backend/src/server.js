import express from "express";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.routes.js";
import MessageRouter from "./routes/message.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT; // running the server on 5000 only
const __dirname = path.resolve();

// all import end here
// start from here

// add all middleware here
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // use the frontend link here
    credentials: true,
  }),
);

// add all router here
app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

// connecting database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected successfully");
  })
  .catch((error) => {
    console.log("Error is ", error);
  });

// starting the server
server.listen(PORT, () => console.log("server is running", PORT));
