import React from "react";
import StudentCard from "./StudentCard"; 
import './App.css'

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <StudentCard name="Swetha" major="B tech-IT" year="3rd Year" />
    </div>
  );
}

export default App;
