import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(rateLimiter); // Apply rate limiting middleware to all routes

app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}
);

//mongodb+srv://navjot10b_db_user:j39Sd8WUnsj1nY5U@cluster0.5h3fsob.mongodb.net/?appName=Cluster0