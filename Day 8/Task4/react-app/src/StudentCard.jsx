import React from "react";

const StudentCard = ({ name, major, year }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl p-5 border border-gray-200 text-center">
      <h2 className="text-xl font-bold text-blue-600">{name}</h2>
      <p className="text-gray-700 mt-2"><strong>Major:</strong> {major}</p>
      <p className="text-gray-700"><strong>Year:</strong> {year}</p>
    </div>
  );
};

export default StudentCard;
