import React from "react";
import StudentList from "./StudentList";
import "./styles.css";

const App = () => {
  return (
    <div className="app-container">
      <h1>Student Management System</h1>
      <StudentList />
    </div>
  );
};

export default App;

