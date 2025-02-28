const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://swetha_116:aswetha116116@swetha.76fg2.mongodb.net/project-0?retryWrites=true&w=majority&appName=swetha", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
});

const Student = mongoose.model("Student", studentSchema);

// GET /students with pagination
app.get("/students", async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query; // Default: page=1, limit=5
    page = parseInt(page);
    limit = parseInt(limit);

    const totalStudents = await Student.countDocuments();
    const students = await Student.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      totalStudents,
      totalPages: Math.ceil(totalStudents / limit),
      currentPage: page,
      students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
