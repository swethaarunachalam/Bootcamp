import React from "react";
import StudentCard from "./StudentCard";

const students = [
  { name: "swetha", year: "Freshman", major: "Fashion designing" },
  { name: "swathi", year: "Sophomore", major: "Mechanical Engineering" },
  { name: "balaji", year: "Junior", major: "Electrical Engineering" },
  { name: "ajay", year: "Senior", major: "Civil Engineering" },
];

const App = () => {
  return (
    <div className="container">
      {students.map((student, index) => (
        <StudentCard key={index} {...student} />
      ))}
    </div>
  );
};

export default App;
