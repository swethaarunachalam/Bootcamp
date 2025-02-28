import React from "react";
import StudentCard from "./StudentCard";
import './App.css'
const List = ({ students }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center mt-6">
      {students.map((student, index) => (
        <StudentCard 
          key={index} 
          name={student.name} 
          major={student.major} 
          year={student.year} 
        />
      ))}
    </div>
  );
};

export default List;
