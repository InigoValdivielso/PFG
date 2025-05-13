import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import NavBarStudent from "./NavBarStudent";
import { useStudent } from '../components/StudentContext';

const StudentLayout = () => {
  const navigate = useNavigate();
  const { setStudentInfo } = useStudent();
  const inactivityTime = 5 * 60 * 1000; // 5 minutos de inactividad (en milisegundos)
  const [timer, setTimer] = useState(null);

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(logoutUser, inactivityTime));
  };

  const logoutUser = () => {
    console.log('Sesión agotada por inactividad.');
    setStudentInfo(null);
    localStorage.removeItem('studentInfo');
    navigate('/studentLogin');
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'wheel', 'touchstart', 'touchmove', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer(); // Inicializar el timer al cargar el layout

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timer) clearTimeout(timer);
    };
  }, [navigate, setStudentInfo, inactivityTime]);

  return (
    <>
      <NavBarStudent />
      <Outlet />
    </>
  );
};

export default StudentLayout;