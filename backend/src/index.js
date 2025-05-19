import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import config from "./config/config.js";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import { app,server } from "./lib/socket.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://chwmq.vercel.app', 'http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, 
  })
  
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }
  const PORT = config.PORT || 8080;
  server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
  });
