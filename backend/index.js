import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import config from "./src/config/config.js";

import { connectDB } from "./src/lib/db.js";

import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js"
import { app,server } from "./src/lib/socket.js";

dotenv.config();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://chwmq.vercel.app/','http://localhost:5173'],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes); //url starts with /api/auth will be handled by authRoutes
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
