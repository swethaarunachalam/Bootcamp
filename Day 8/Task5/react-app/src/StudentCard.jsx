import React from "react";
import './App.css'
const StudentCard = ({ name, major, year }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-80 text-center border border-gray-300">
      <h2 className="text-xl font-bold text-blue-600">{name}</h2>
      <p className="text-gray-700 mt-2">Major: {major}</p>
      <p className="text-gray-500">Year: {year}</p>
    </div>
  );
};

export default StudentCard;
