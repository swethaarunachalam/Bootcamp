
import React, { useState } from "react";
import StudentCard from "./StudentCard";
import "./StudentList.css";

const students = [
  { name: "kamali", year: "Freshman", major: "VSL" },
  { name: "kani", year: "Sophomore", major: "Mechanical Engineering" },
  { name: "lokesh", year: "Junior", major: "AI" },
  { name: "soundarya", year: "Senior", major: "Civil Engineering" },
];

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search students..."
        className="search-bar"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="student-list">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <StudentCard key={index} {...student} />
          ))
        ) : (
          <p className="no-results">No students found</p>
        )}
      </div>
    </div>
  );
};

export default StudentList;