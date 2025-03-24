import ModalCredential from "../components/ModalCredential";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CompartirMicrocredenciales = () => {
    const [isComplete, setIsComplete] = useState(false);
    return (
        <div className="boton-container">
          <div className="input-group mb-3">
            <div className="input-group-text">
              <input
                type="checkbox"
                defaultValue=""
                aria-label="Checkbox for following text input"
                className="custom-checkbox"
                disabled
                checked={isComplete}
              />
            </div>
            <button
              onClick={() => handleButtonClick()}
              className="btn btn-primary"
              id="boton"
              type="button"
              disabled={isComplete}
              style={{
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              Comparte tus Microcredenciales
            </button>
            <div className="col" style={{ paddingTop: "2%" }}>
              <ModalCredential
                title="Comparte tus Microcredenciales"
                description="Deberás de compartir tanto tu Verifiable Id como tu University Degree"
                id="microcredenciales"
              />
            </div>
          </div>
          <style jsx>{`
        .custom-checkbox {
          appearance: none; /* Oculta el checkbox predeterminado */
          width: 40px;
          height: 20px;
          background-color: #ccc;
          border-radius: 20px;
          position: relative;
          transition: background 0.3s ease-in-out;
          cursor: not-allowed;
        }

        .custom-checkbox:checked {
          background-color: #0153ce;
        }

        .custom-checkbox::before {
          content: "";
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.3s ease-in-out;
        }

        .custom-checkbox:checked::before {
          transform: translateX(20px);
        }
        .separar {
          margin-left: 30px;
        }
        .formulario-contenedor {
          flex: 1;
        }

        .boton-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 10px;
        }
      `}</style>
        </div>
        
    );

};
export default CompartirMicrocredenciales;
