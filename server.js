import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import process from "process";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();

//Middleware
app.use(cors(
    {
    origin: [
      "https://soccerversefrontend.netlify.app/",
      "http://localhost:5173"
    ],// your Vite frontend
    methods: ["GET", "POST",  "PUT", "DELETE"],
    credentials: true, // optional, but useful if you later use cookies or auth
    allowedHeaders: ['Content-Type', 'Authorization']
  }
));
app.use(express.json());

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ MongoDB connected")).catch((err) => {console.error("❌ MongoDB error:", err.message); console.log("Connection string (sanitized): ", process.env.MONGO_URI.replace(/:[^:@]+@/, ':****@'))});

//Routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    res.send("SoccerVerse backend is running🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));