import React from "react";
import './App.css'
const StudentName = ({ name }) => {
  return (
    <h1 style={{ color: "blue", fontSize: "24px" }}>
      Student Name: {name}
    </h1>

  );
};

export default StudentName;
