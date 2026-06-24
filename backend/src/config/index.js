import dotenv from "dotenv";
//import express from "express";
import connectDB from "./database.js";
import app from "./app.js";

dotenv.config({
    path: './.env',
}); // Load environment variables from .env file


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








