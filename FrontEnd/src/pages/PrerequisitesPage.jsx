import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalCredential from "../components/ModalCredential";

const PrerequisitesPage = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [DNINIE, setDNINIE] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [documentFile, setDocumentFile] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
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
      }, 60000); // 1 minuto

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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setIsEmailValid(validateEmail(emailValue));
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isFormValid =
    (isEmailValid &&
      nombre &&
      primerApellido &&
      segundoApellido &&
      birthDate &&
      DNINIE &&
      documentFile &&
      termsAccepted) ||
    (isComplete && termsAccepted);

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
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              disabled={isComplete}
            >
              Formulario Clásico
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-between">
                <div className="formulario-contenedor">
                  <form className="row g-3 needs-validation was-validated">
                    <div className="row g-2">
                      <div className="col-md-3">
                        <label className="form-label">Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <div className="separar">
                          <label className="form-label">Primer apellido</label>
                          <input
                            type="text"
                            className="form-control"
                            value={primerApellido}
                            onChange={(e) => setPrimerApellido(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="separar">
                          <label className="form-label">Segundo apellido</label>
                          <input
                            type="text"
                            className="form-control"
                            value={segundoApellido}
                            onChange={(e) => setSegundoApellido(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-md-4">
                        <label
                          htmlFor="validationCustomUsername"
                          className="form-label"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className={`form-control ${
                            email && !isEmailValid ? "is-invalid" : ""
                          }`}
                          value={email}
                          onChange={handleEmailChange}
                          id="validationCustomUsername"
                          aria-describedby="inputGroupPrepend"
                          required
                        />
                        <div className="invalid-feedback">
                          Por favor introduce tu email.
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="separar">
                          <label className="form-label">
                            Fecha de Nacimiento
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={birthDate}
                            onChange={(e) => {
                              const selectedDate = new Date(e.target.value);
                              const today = new Date();

                              const age =
                                today.getFullYear() -
                                selectedDate.getFullYear();
                              const monthDiff =
                                today.getMonth() - selectedDate.getMonth();
                              const dayDiff =
                                today.getDate() - selectedDate.getDate();

                              if (
                                age < 18 ||
                                (age === 18 && monthDiff < 0) ||
                                (age === 18 && monthDiff === 0 && dayDiff < 0)
                              ) {
                                alert("Debes tener al menos 18 años.");
                              } else {
                                setBirthDate(e.target.value);
                              }
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="separar">
                          <label className="form-label">DNI/NIE</label>
                          <input
                            type="text"
                            className="form-control"
                            value={DNINIE}
                            onChange={(e) => setDNINIE(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row g-2">
                      <div className="col-md-6">
                        <label className="form-label">
                          Subir Fotocopia de Requisitos
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*,application/pdf"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                    </div>
                    <div
                      className="col-md-6"
                      id="separacion"
                      style={{ paddingTop: "2%" }}
                    ></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-md-6"
        id="separacion"
        style={{ paddingTop: "3%" }}
      ></div>
      <div className="separator">
        <hr />
        <span>o</span>
        <hr />
      </div>
      <div
        className="col-md-6"
        id="separacion"
        style={{ paddingTop: "1%" }}
      ></div>
      <div className="botonCompartir">
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
          <div className="col" style={{ paddingTop: "1%" }}>
            <ModalCredential
              title="Comparte tus Microcredenciales"
              description="Deberás de compartir tu EducationalID"
              id="microcredenciales"
            />
          </div>
        </div>
      </div>

      <div
        className="col-md-6"
        id="separacion"
        style={{ paddingTop: "1%" }}
      ></div>

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
          
        </div>
      </div>
      <div className="col-12" style={{ paddingTop: "2%" }}>
        <button
          className="btn btn-primary"
          id="boton"
          type="submit"
          disabled={!isFormValid}
        >
          Enviar Solicitud
        </button>
      </div>
      <style jsx>{`
        .botonCompartir {
          margin-left: 35%;
        }
        .separar {
          margin-left: 30px;
        }
        .separator {
          display: flex;
          align-items: center;
          margin-top: -14px;
          margin-bottom: 5px;
        }
        .separator hr {
          flex-grow: 1;
          border: 1.5px solid #000000;
        }
        .separator span {
          margin: 0 8px;
          font-size: 16px;
        }
        .formulario-contenedor {
          margin-left: 10%;
        }
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
      `}</style>
    </div>
  );
};
export default PrerequisitesPage;
