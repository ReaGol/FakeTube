import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import userRoute from "./routes/user.route.js"
import videoRoute from "./routes/video.route.js"
import commentsRoute from "./routes/comments.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB");
    }).catch(error => {throw error})
}

app.use(cookieParser())
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  })
);
app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/users", userRoute)
app.use("/api/videos",videoRoute)
app.use("/api/comments",commentsRoute)

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";  
  return res.status(status).json({
      success:false,
      status,
      message,
  })
})

app.listen(8800, () => {
    connect()
    console.log("Connected to server");
})