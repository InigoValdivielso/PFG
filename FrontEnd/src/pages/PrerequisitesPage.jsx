import ModalCredential from "../components/ModalCredential";
import React, { useState, useEffect } from 'react';

const PrerequisitesPage = () => {
  const [isComplete, setIsComplete] = useState(false);
  let myAppTab = null; 

  const handleOpenTab = () => {
    const baseUrl = 'http://localhost:7102'; // La URL base que queremos controlar

    // Si la pestaña ya está abierta
    if (myAppTab && !myAppTab.closed) {
      myAppTab.location.replace(baseUrl); // Redirigir a la base URL
      console.log("Redirigiendo a la pestaña existente a la base URL.");
      myAppTab.focus(); // Enfocar la pestaña existente
    } else {
      // Abrir una nueva pestaña
      myAppTab = window.open(baseUrl, '_blank');
      console.log("Se abrió una nueva pestaña.");
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('http://localhost:7001/wallet-api/wallet/c67db2b8-5142-46f4-8806-b1a07621666d/exchange/matchCredentialsForPresentationDefinition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }})
          .then(response => {
            if (response.status === 200) { // Verifica solo el estado
              setIsComplete(true); // Marca el checkbox como completado
              clearInterval(intervalId); // Detiene el polling si se completa
              }
          })
        .catch(error => console.error('Error al verificar estado:', error));
    }, 3000); // Consulta cada 3 segundos, ajusta según necesites

    return () => clearInterval(intervalId); // Limpieza si el componente se desmonta
  }, []);


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
        Prerequisites Form
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
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
              <div className="invalid-feedback">Please enter your email.</div>
            </div>
          </div>
          <div className="col-md-6" id="separacion">
            <div className="row-md-4 d-flex">
              <label htmlFor="validationCustomUsername" className="form-label">
                Verifable ID
              </label>
              <div className="col">

                <ModalCredential title="Verifiable ID" description="This credential is a digital representation of every day attributes of your identity." id="verifiableid"/>

              </div>
            </div>
            <div className="row">
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    defaultValue=""
                    aria-label="Checkbox for following text input"
                    disabled
                    checked={isComplete}
                  />
                </div>
                <button onClick={handleOpenTab} className="btn btn-primary" id="boton" type="button">
                  Share your Microcredential
                </button>
              </div>
            </div>
            <div className="row-md-4 d-flex">
              <label htmlFor="validationCustomUsername" className="form-label">
                University Degree
              </label>
              <div className="col">

                <ModalCredential title="University Degree" description="This credential is the representation of your previous studies before entering the program." id="university"/>

              </div>
            </div>
            <div className="row">
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    defaultValue=""
                    aria-label="Checkbox for following text input"
                    disabled
                  />
                </div>
                <button onClick={handleOpenTab} className="btn btn-primary" id="boton" type="button">
                  Share your Microcredential
                </button>
              </div>
            </div>
            <div className="row-md-4 d-flex">
              <label htmlFor="validationCustomUsername" className="form-label">
                Language Skills
              </label>
              <div className="col">

                <ModalCredential title="Language Skills" description="This credential represents your english level before entering the program." id="language"/>
                
              </div>
            </div>
            <div className="row">
              <div className="input-group mb-3">
                <div className="input-group-text">
                  <input
                    type="checkbox"
                    defaultValue=""
                    aria-label="Checkbox for following text input"
                    disabled
                  />
                </div>
                <button onClick={handleOpenTab} className="btn btn-primary" id="boton" type="button">
                  Share your Microcredential
                </button>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="invalidCheck"
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" id="boton" type="submit">
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PrerequisitesPage;
