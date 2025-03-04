import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = "mongodb+srv://swetha_116:aswetha116116@swetha.76fg2.mongodb.net/project-0?retryWrites=true&w=majority&appName=swetha";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Student Schema
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true } // Renamed from studentID
});

const Student = mongoose.model('Student', StudentSchema);

// API Route to Fetch Students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
});

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
