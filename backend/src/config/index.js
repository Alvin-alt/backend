import dotenv from "dotenv";
import express from "express";
import connectDB from "./database.js";
import app from "./app.js";
import cookieParser from "cookie-parser";  //new
import cors from "cors"; //new


dotenv.config({
    path: './.env',
}); // Load environment variables from .env file

app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from the specified client URL
    credentials: true, // Allow credentials (cookies) to be sent with requests
}));    


const startServer = async () => {
    try {
        console.log("MONGODB_URI:", process.env.MONGODB_URI); // Log the MongoDB URI for debugging
        await connectDB(); // Connect to the database


        app.on("error", (error) => {
            console.log("ERROR:", error);
            throw error; // Rethrow the error to be caught by the outer catch block
        });


        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port :
                ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("MongoDb connection failed!!", error);
    }
}


startServer();








