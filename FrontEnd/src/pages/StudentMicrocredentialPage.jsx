import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavBarStudent from "../components/NavBarStudent";

const StudentMicrocredentialPage = ({ nia, dni, nombre, apellido1, apellido2, genero, email, program }) => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const loadedNia = "123456";
  const loadedDni = "12345678A";
  const loadedName = "Juan";
  const loadedFirstSurname = "Perez";
  const loadedSecondSurname = "Garcia";
  const loadedGender = "Male";
  const loadedEmail = "juan@opendeusto.es";
  const loadedProgram = "Digital Transformation for SMEs";

  const initialize = async () => {
    // Here you can do anything you need, for example, an API call

    // We simulate an asynchronous operation with setTimeout
    await new Promise(resolve => setTimeout(resolve, 2000));
  };
  const handleButtonClick = () => {
    navigate("/microcredentials/solicitar/EducationalID");
  };
  useEffect(() => {
    const executeInitialization = async () => {
      await initialize();
      setIsLoading(false); // Once initialization is complete, update the loading state
    };

    executeInitialization();
  }, []);

  if (isLoading) {
    // While isLoading is true, show a loading indicator
    return <div>Loading...</div>;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <NavBarStudent />

      <div className="container">
        <h1
          className="title"
          style={{
            textAlign: "center",
            paddingBottom: "3%",
            paddingTop: "8%",
            fontWeight: "800",
            color: "#000000",
          }}
        >
          Personal Information
        </h1>

        <table class="table table-bordered">
          <tbody>
            <tr>
              <td style={{ background: "#EBEBEB",  fontWeight: 'bold'}}>NIA</td>
              <td style={{ background: "#EBEBEB" }}>{loadedNia}</td>
              <td style={{ background: "#EBEBEB",  fontWeight: 'bold' }}>DNI, Passport</td>
              <td style={{ background: "#EBEBEB" }}>{loadedDni}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB",  fontWeight: 'bold' }}>Name</td>
              <td style={{ background: "#EBEBEB" }}>{loadedName}</td>
              <td style={{ background: "#EBEBEB",  fontWeight: 'bold' }}>First Surname</td>
              <td style={{ background: "#EBEBEB" }}>{loadedFirstSurname}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB",  fontWeight: 'bold' }}>Second Surname</td>
              <td style={{ background: "#EBEBEB" }}>{loadedSecondSurname}</td>
              <td style={{ background: "#EBEBEB",  fontWeight: 'bold' }}>Gender</td>
              <td style={{ background: "#EBEBEB" }}>{loadedGender}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB",  fontWeight: 'bold' }}>Email</td>
              <td style={{ background: "#EBEBEB" }}>{loadedEmail}</td>
              <td style={{ background: "#EBEBEB" }}></td>
              <td style={{ background: "#EBEBEB" }}></td>
            </tr>
          </tbody>
        </table>

        <br></br>
        <div>
          <table class="table-borderless" style={{ width: "55%", marginLeft: "23%" }}>
            <tbody>
              <tr style={{ backgroundColor: "white" }}>
                <td style={{ fontWeight: 'bold', textAlign: "center", paddingTop: "3.5%" }}>{loadedProgram}</td>
                <td style={{ paddingRight: "1%"}}><button className="btn btn-primary" type="button">Solicitar</button></td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td style={{ fontWeight: 'bold', textAlign: "center", paddingTop: "3.5%" }}>EducationalID</td>
                <td style={{ paddingRight: "1%"}}><button onClick={() => handleButtonClick()} className="btn btn-primary" type="button">Solicitar</button></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};
export default StudentMicrocredentialPage;
