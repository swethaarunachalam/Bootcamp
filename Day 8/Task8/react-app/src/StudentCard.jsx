import React from "react";
import "./styles.css";

const StudentCard = ({ student, onRemove }) => {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p><strong>Year:</strong> {student.year}</p>
      <p><strong>Major:</strong> {student.major}</p>
      <button className="remove-btn" onClick={() => onRemove(student.name)}>
        Remove
      </button>
    </div>
  );
};

export default StudentCard;
