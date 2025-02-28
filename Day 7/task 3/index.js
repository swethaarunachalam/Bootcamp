const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
.connect(
    "mongodb+srv://swetha_116:aswetha116116@swetha.76fg2.mongodb.net/project-0?retryWrites=true&w=majority&appName=swetha",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: String,
  email: String,
});

const Student = mongoose.model("Student", studentSchema);

app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID or Server Error", error });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
