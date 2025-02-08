import React from "react";
import logoDeusto from "../assets/images/LogoDeusto.png";
import logoGataca from "../assets/images/LogoGataca.png";
import logoWaltid from "../assets/images/LogoWaltid.png";
import { useLocation, useNavigate } from "react-router-dom";

const ChooseWalletPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/"; // Redirigir después del login

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true"); // Guardar sesión en localStorage
    navigate(redirectTo); // Redirigir a la URL deseada
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#E6E7E8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <img
          src={logoDeusto}
          alt="Deusto Logo"
          style={{ width: "17%", marginTop: "-15%" }}
        />
        <div
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: "3%",
            paddingTop: "2%",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "30%",
          }}
        >
          <h1 style={{ textAlign: "center", fontSize: "20px" }}>Con que wallet quieres iniciar sesión</h1>
          <button
            className="btn btn-dark"
            onClick={handleLogin}
            style={{ display: "block", marginTop: "10%", marginLeft: "25%", width: "51%" }}
          >
            <img src={logoGataca} alt="Gataca Logo"  style={{ width: '25px', height: '25px', marginRight:"8%" }} />
            Login with Gataca
          </button>
          <button
            className="btn btn-dark"
            onClick={handleLogin}
            style={{display: "block", marginTop: "5%", marginLeft: "25%",marginBottom:"10%", width: "51%"}}
          >
            <img src={logoWaltid} alt="Gataca Logo"  style={{ width: '25px', height: '25px', marginRight:"8%", marginLeft: "-5%" }} />
            Login with Waltid 
          </button>
        </div>
      </div>
    </>
  );
};

export default ChooseWalletPage;
