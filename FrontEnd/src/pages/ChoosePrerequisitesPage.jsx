import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChoosePrerequisitesPage = () => {
  const navigate = useNavigate();

  const handleFormSelection = () => {
    // Redirige a la página de formulario clásico
    navigate("/formularioClasico");
  };

  const handleMicrocredentialSelection = () => {
    // Redirige a la página de compartir microcredenciales
    navigate("/formularioMicrocredencial");
  };

  return (
    <div className="container">
      <h1
        className="titulo"
        style={{
          textAlign: "center",
          paddingBottom: "2%",
          fontWeight: "800",
          color: "#0153CE",
        }}
      >
        Escoge una opción
      </h1>

      <div className="col p-3">
        <div className="text-center">
          <div className="row mb-4 ">
            <button
              className="btn btn-primary custom-btn"
              onClick={handleFormSelection}
            >
              Formulario Clásico
            </button>
          </div>
          <div className="row">
            <button
              className="btn btn-secondary custom-btn"
              onClick={handleMicrocredentialSelection}
            >
              Compartir Microcredenciales
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-btn {
          width: 300px; 
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default ChoosePrerequisitesPage;
