import logoDeusto from '../assets/images/LogoDeustoBlanco.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBarSecretary() {
  const navigate = useNavigate();
  const clearAuthToken = () => {
    sessionStorage.removeItem('token');  
  };
  const handleLogout = async () => {
    try {
      clearAuthToken();
      navigate('/secretaryLogin'); 
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logoDeusto} alt="Logo Deusto" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mt-5 mx-5 px-4">
              <li className="nav-item  px-3">
                <a className="nav-link active" aria-current="page" href="#">
                  Mis aplicaciones
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#">
                  Mi cuenta
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" href="#">
                  Soporte
                </a>
              </li>
              <li className="nav-item px-3">
                <a className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer', color: 'white' }}>
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBarSecretary;
