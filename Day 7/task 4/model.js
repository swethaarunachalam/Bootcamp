const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: Number, required: true, unique: true },
    age: { type: Number, required: true },
    department: { type: String, required: true }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
