import React from "react";
import logoDeusto from "../assets/images/LogoDeusto.png";
import logoGataca from "../assets/images/LogoGataca.png";
import logoWaltid from "../assets/images/LogoWaltid.png";
import { useLocation, useNavigate } from "react-router-dom";

const ChooseWalletPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    navigate(redirectTo);
  };

  return (
    <div className="container">
      <img src={logoDeusto} alt="Deusto Logo" className="logo-deusto" />
      <div className="wallet-box">
        <h1>¿Con qué wallet quieres iniciar sesión?</h1>
        <button className="wallet-button" onClick={handleLogin}>
          <img src={logoGataca} alt="Gataca Logo" className="wallet-logo" />
          Iniciar sesión con Gataca
        </button>
        <button className="wallet-button" onClick={handleLogin}>
          <img src={logoWaltid} alt="Waltid Logo" className="wallet-logo" />
          Iniciar sesión con Waltid
        </button>
      </div>

      <style jsx>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: #e6e7e8;
        }
        .container {
          
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          min-height: 100vh;
          padding: 20px;
          width: 100vw;
          height: 100vh;
          
          
        }

        .logo-deusto {
          width: 250px;
          margin-top: -15%;
        }

        .wallet-box {
          background-color: #ffffff;
          padding: 25px;
          margin-top: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        h1 {
          font-size: 18px;
          margin-bottom: 20px;
        }

        .wallet-button {
          background-color: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 10px;
          margin: 10px 0;
          border: none;
          border-radius: 25px;
          cursor: pointer;
        }

        .wallet-logo {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }

        @media (max-width: 600px) {
          .logo-deusto {
            width: 120px;
            margin-top: -5%;
          }

          .wallet-box {
            padding: 15px;
          }

          h1 {
            font-size: 16px;
          }

          .wallet-button {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ChooseWalletPage;
