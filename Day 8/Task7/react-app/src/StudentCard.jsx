import React from "react";
import "./StudentCard.css";

const StudentCard = ({ name, year, major }) => {
  return (
    <div className={`student-card ${year.toLowerCase()}`}>
      <h2 className="student-name">{name}</h2>
      <p className="student-year">Year: {year}</p>
      <p className="student-major">Major: {major}</p>
    </div>
  );
};

export default StudentCard;