import ModalCredential from "../components/ModalCredential";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrerequisitesPage = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/comparteCredenciales");
  };

  useEffect(() => {
    const verificationComplete = localStorage.getItem("verificationComplete");
    if (verificationComplete) {
      setIsComplete(true);
      const timeout = setTimeout(() => {
        localStorage.removeItem("verificationComplete");
        setIsComplete(false);
      }, 60000); // 1 minutos

      // Limpiar el temporizador si el usuario navega fuera de la página
      return () => clearTimeout(timeout);
    }
  }, []);
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("verificationComplete");
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Expresión regular para validar email
  };

  const isFormValid = isEmailValid && termsAccepted && isComplete;
  return (
    <div className="container" id="formulario">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <h1
        className="titulo"
        style={{
          textAlign: "center",
          paddingBottom: "2%",
          fontWeight: "800",
          color: "#0153CE",
        }}
      >
        Formulario de Solicitud
      </h1>
      <div className="d-flex justify-content-center">
        <form className="row g-3 needs-validation was-validated">
          <div className="col-md-6">
            <label htmlFor="validationCustomUsername" className="form-label">
              Email
            </label>
            <div className="col-md-9">
              <input
                type="email"
                className={`form-control ${email && !isEmailValid ? "is-invalid" : ""}`}
                value={email}
                onChange={handleEmailChange}
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
              <div className="invalid-feedback">
                Porfavor introduce tú email.
              </div>
            </div>
          </div>
          <div
            className="col-md-6"
            id="separacion"
            style={{ paddingTop: "3%" }}
          >
            <div className="row">
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
                    description="Deberás de compartir tanto tu Verifable Id como tu University Degree"
                    id="microcredenciles"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheck"
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                Acepto los términos y condiciones
              </label>
              <div className="invalid-feedback">
                Debes de aceptar antes de enviar.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" id="boton" type="submit" disabled={!isFormValid}>
              Enviar Solicitud
            </button>
          </div>
        </form>
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
      `}</style>
    </div>
  );
};
export default PrerequisitesPage;
