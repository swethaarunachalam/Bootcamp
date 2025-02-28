import React from "react";
import StudentList from "./StudentList";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <h1 className="title">Student Directory</h1>
      <StudentList />
    </div>
  );
};

export default App;

