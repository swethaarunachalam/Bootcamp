import React from "react";
import List from "./List";
import './App.css';
import './index.css'
function App() {
  const students = [
    { name: "1.swetha", major: "IT", year: "3rd Year" },
    { name: "2.swathi", major: "IT", year: "3rd Year" },
    { name: "3.saru", major: "CSE", year: "4th Year" },
    { name: "4.lokesh", major: "CST", year: "1st Year" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800">STUDENT LIST</h1>
      <List students={students} />
    </div>
  );
}

export default App;
