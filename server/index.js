import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"

const app = express()
dotenv.config()

const connect = () => {
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB");
    }).catch(error => {throw error})
}

app.use("/api/users", userRoute)

app.listen(8800, () => {
    connect()
    console.log("Connected to server");
})