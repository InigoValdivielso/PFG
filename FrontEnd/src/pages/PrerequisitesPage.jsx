import ModalCredential from "../components/ModalCredential";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrerequisitesPage = () => {
  const [isComplete, setIsComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const navigate = useNavigate(); 
  let myAppTab = null; 

  const handleButtonClick = (url) => {
    if (!isAuthenticated) {
      // Si NO ha iniciado sesión, lo llevamos a la página de inicio de sesión
      navigate('/chooseWallet', { state: { redirectTo: url } }); 
    } else {
      // Si ya ha iniciado sesión, abrimos la URL directamente
      if (myAppTab && !myAppTab.closed) {
        myAppTab.location.replace(url);
        myAppTab.focus();
      } else {
        myAppTab = window.open(url, '_blank');
      }
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
  
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
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
          <div className="col-md-6" id="separacion" style={{paddingTop: "3%"}}>
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
                <button onClick={() => handleButtonClick('http://localhost:5173/chooseWallet')} className="btn btn-primary" id="boton" type="button" style={{borderTopRightRadius: "10px", borderBottomRightRadius: "10px"}}>
                    Comparte tus Microcredenciales
                </button>
                <div className="col" style={{paddingTop: "2%"}}>

                  <ModalCredential title="Comparte tus Microcredenciales" description="Deberás de compartir tanto tu Verifable Id como tu University Degree" id="microcredenciles"/>

                </div>
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
