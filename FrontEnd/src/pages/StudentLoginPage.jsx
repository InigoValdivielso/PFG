import React from "react";
import logoDeusto from "../assets/images/LogoDeusto.png";
import { Link } from "react-router-dom";
import ModalCredential from "../components/ModalCredential";
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { useStudent } from "../components/StudentContext";


const StudentLoginPage = () => {

  const navigate = useNavigate();
  const { setStudentInfo } = useStudent();

  const hostedDomain = 'opendeusto.es';

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Token Response:', tokenResponse);
      const accessToken = tokenResponse.access_token;

      if (accessToken) {
        try {
          const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const userData = await response.json();
          console.log('User Data from Google:', userData);

          if (userData.email && userData.email.endsWith(`@${hostedDomain}`)) {
            const email = userData.email;

            const backendResponse = await fetch(`http://localhost:8000/estudiante/correo?correo=${email}`);
            const backendData = await backendResponse.json();

            if (backendResponse.ok) {
              const studentInfo = backendData;
              setStudentInfo(studentInfo);
              localStorage.setItem('studentInfo', JSON.stringify(studentInfo));
              navigate('/studentPortal');
            } else {
              console.error('Error del backend:', backendData);
            }
          } else {
            console.error('El correo no pertenece a @opendeusto.es');
          }
        } catch (error) {
          console.error('Error al obtener la información del usuario de Google:', error);
        }
      } else {
        console.error('Access token no encontrado.');
      }
    },
    onError: response => console.log('Login Failed:', response),
    hosted_domain: hostedDomain,
  });

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "6%",
        }}
      >
        <img src={logoDeusto} alt="Deusto Logo" style={{ width: "15%" }} />
        <div
          className="firstBox"
          style={{
            marginTop: "2%",
            backgroundColor: "#E6E7E8",
            width: "30%",
            borderTopStyle: "solid",
            borderWidth: "2px",
            borderTopColor: "#1B459A",
            boxShadow: "0px 0px 10px 0px #000000",
          }}
        >
          <h5
            style={{ paddingTop: "8%", textAlign: "center", fontSize: "100%" }}
          >
            Acceso con cuenta @opendeusto
          </h5>
          <button
            className="btn btn-primary"
            id="loginButton"
            onClick={googleLogin}
            style={{
              marginLeft: "37%",
              marginTop: "5%",
              marginBottom: "5%",
              fontSize: "90%",
            }}
          >
            Iniciar sesión
          </button>
        </div>
        <div
          className="secondBox"
          style={{
            marginTop: "2%",
            backgroundColor: "#E6E7E8",
            width: "30%",
            borderTopStyle: "solid",
            borderWidth: "2px",
            borderTopColor: "#1B459A",
            boxShadow: "0px 0px 10px 0px #000000",
          }}
        >
          <h5
            style={{
              paddingTop: "8%",
              textAlign: "center",
              fontSize: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Acceso con EducationalID
            <div style={{ marginLeft: "5px" }}>
              <ModalCredential
                title="Accede con tu EducationalID"
                description=""
                id="microcredenciles"
              />
            </div>
          </h5>


          <Link to="/studentLogin/qr">
            <button
              className="btn btn-primary"
              id="loginButton"
              style={{
                marginLeft: "40%",
                marginTop: "5%",
                marginBottom: "5%",
                fontSize: "90%",
              }}
            >
              Acceder
            </button>
          </Link>
          <br />
          <a
            href=""
            style={{ marginLeft: "15%", fontSize: "80%", color: "#6c94e3" }}
          >
            No tengo una credencial verificable, solicitarla
          </a>
        </div>
        <div
          style={{
            marginTop: "2%",
            backgroundColor: "#E6E7E8",
            width: "30%",
            borderTopStyle: "solid",
            borderWidth: "2px",
            borderTopColor: "#1B459A",
            boxShadow: "0px 0px 10px 0px #000000",
          }}
        >
          <div className="secondBox" style={{ backgroundColor: "#0053CE" }}>
            <h6
              style={{
                padding: "6%",
                textAlign: "center",
                fontSize: "100%",
                color: "white",
              }}
            >
              Acceso con NIU
            </h6>
          </div>
          <div
            className="input-group"
            style={{ display: "flex", flexDirection: "column", padding: "5%" }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="userId"
                maxLength={50}
                name="userId"
                defaultValue=""
                placeholder="User"
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", marginTop: "8%" }}
            >
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <span className="material-symbols-outlined">lock</span>
              </span>

              <input
                type="password"
                className="form-control"
                id="password"
                maxLength={50}
                name="password"
                defaultValue=""
                placeholder="Contraseña"
                style={{ borderRadius: "0 5px 5px 0" }}
              />
            </div>
          </div>
          <a
            href=""
            style={{ marginLeft: "5%", fontSize: "80%", color: "#6c94e3" }}
          >
            No tengo una cuenta, solicitar registro
          </a>
          <br />
          <a
            href=""
            style={{ marginLeft: "5%", fontSize: "80%", color: "#6c94e3" }}
          >
            {" "}
            No sé o he olvidado mi contraseña
          </a>
          <br />
          <button
            className="btn btn-primary"
            id="enterButton"
            style={{ marginLeft: "35%", marginBottom: "5%", marginTop: "3%" }}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
      <br />
    </>
  );
};

export default StudentLoginPage;
