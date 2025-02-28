import React, { useState } from "react";
import StudentCard from "./StudentCard";
import "./styles.css";

const StudentList = () => {
  const [students, setStudents] = useState([
    { name: "swetha", year: "Freshman", major: "IT" },
    { name: "arunachalam", year: "Sophomore", major: "Software Engineering" },
    { name: "padma", year: "Junior", major: "Electrical Engineering" }
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    year: "",
    major: ""
  });


  const handleInputChange = (event) => {
    setNewStudent({ ...newStudent, [event.target.name]: event.target.value });
  };


  const addStudent = () => {
    if (newStudent.name && newStudent.year && newStudent.major) {
      setStudents([...students, newStudent]);
      setNewStudent({ name: "", year: "", major: "" }); 
    }
  };


  const removeStudent = (name) => {
    setStudents(students.filter(student => student.name !== name));
  };

  return (
    <div className="container">
      <h2>Student List</h2>

      <div className="add-student-form">
        <input type="text" name="name" placeholder="Name" value={newStudent.name} onChange={handleInputChange} />
        <input type="text" name="year" placeholder="Year (e.g., Freshman)" value={newStudent.year} onChange={handleInputChange} />
        <input type="text" name="major" placeholder="Major" value={newStudent.major} onChange={handleInputChange} />
        <button onClick={addStudent}>Add Student</button>
      </div>

      <div className="student-list">
        {students.length > 0 ? (
          students.map((student, index) => (
            <StudentCard key={index} student={student} onRemove={removeStudent} />
          ))
        ) : (
          <p className="no-students">No students available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;
