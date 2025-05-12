import { createContext, useState, useContext, useEffect} from 'react';

const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem('studentInfo');
    if (storedInfo) {
      setStudentInfo(JSON.parse(storedInfo));
    }
  }, []);

  return (
    <StudentContext.Provider value={{ studentInfo, setStudentInfo }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  return useContext(StudentContext);
};