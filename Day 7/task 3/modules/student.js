const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a student name"]
        },
        age: {
            type: Number,
            required: [true, "Please enter a student age"]
        },
        rollNo: {
            type: String,
            required: [true, "Please enter a student roll number"]
        },
        department: {
            type: String,
            required: [true, "Please enter the department"]
        }
    },
    {
        timestamps: true  
    }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
