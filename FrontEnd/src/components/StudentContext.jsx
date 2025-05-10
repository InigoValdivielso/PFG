import { createContext, useState, useContext } from 'react';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [studentInfo, setStudentInfo] = useState(null);

  return (
    <StudentContext.Provider value={{ studentInfo, setStudentInfo }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  return useContext(StudentContext);
};