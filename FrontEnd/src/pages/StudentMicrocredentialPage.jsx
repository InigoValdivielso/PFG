import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarStudent from "../components/NavBarStudent";
import { useStudent } from "../components/StudentContext";

const StudentMicrocredentialPage = ({}) => {
  const navigate = useNavigate();
  const { studentInfo } = useStudent();
  const [studentCredentials, setStudentCredentials] = useState([]);
  const [checkedCredentials, setCheckedCredentials] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (studentInfo?.credenciales) {
      console.log("Credenciales del estudiante:", studentInfo.credenciales);
      setStudentCredentials(studentInfo.credenciales);
      const initialChecked = {};
      studentInfo.credenciales.forEach(credencialId => {
        initialChecked[credencialId] = false;
      });
      setCheckedCredentials(initialChecked);
    }
  }, [studentInfo?.credenciales]);

  const initialize = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleButtonClick = () => {
    const selectedCredentials = Object.keys(checkedCredentials).filter(id => checkedCredentials[id]);
    navigate("/microcredentials/solicitar/EducationalID"); // Ejemplo de navegación
  };

  useEffect(() => {
    const executeInitialization = async () => {
      await initialize();
      // setIsLoading(false); // Si tuvieras un estado de carga
    };
    executeInitialization();
  }, []);

  const handleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    const updatedChecked = {};
    studentCredentials.forEach(id => {
      updatedChecked[id] = newState;
    });
    setCheckedCredentials(updatedChecked);
  };

  useEffect(() => {
    setSelectAll(studentCredentials.length > 0 && Object.values(checkedCredentials).every(Boolean));
  }, [checkedCredentials, studentCredentials]);

  const handleCheckboxChange = (id) => {
    setCheckedCredentials((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAnyChecked = Object.values(checkedCredentials).some(Boolean);

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
          Información Personal
        </h1>

        <table className="table table-bordered">
          <tbody>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>NIA</td>
              <td style={{ background: "#EBEBEB", paddingRight: "180px" }}>{studentInfo?.NIA}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                DNI, Pasaporte
              </td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.dni}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Nombre
              </td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.nombre}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Primer Apellido
              </td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.primer_apellido}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Segundo Apellido
              </td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.segundo_apellido}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Email
              </td>
              <td style={{ background: "#EBEBEB" }}>{studentInfo?.correo}</td>
            </tr>
          </tbody>
        </table>

        <br />
        <div className="listaCredenciales">
          <h3
            style={{
              textAlign: "center",
              paddingBottom: "2%",
              paddingTop: "2%",
              fontWeight: "800",
              color: "#000000",
            }}
          >
            Listado de Microcredenciales
          </h3>
          <br />
          <div className="checkboxes">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="selectAll"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <label
                className="form-check-label"
                htmlFor="selectAll"
                style={{ fontWeight: "bold" }}
              >
                Seleccionar todas
              </label>
            </div>
            <div
              className="col-md-6"
              id="separacion"
              style={{ paddingTop: "1%" }}
            ></div>
            {studentCredentials.map((credencialId, index) => (
              <div className="form-check form-switch" key={credencialId}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={credencialId}
                  checked={checkedCredentials[credencialId] || false}
                  onChange={() => handleCheckboxChange(credencialId)}
                />
                <label className="form-check-label" htmlFor={credencialId}>
                  Microcredencial ID: {credencialId} {/* Aquí podrías buscar el nombre real */}
                </label>
              </div>
            ))}
          </div>
          <button
            className="btn btn-primary"
            id="boton"
            type="submit"
            onClick={handleButtonClick}
            disabled={!isAnyChecked}
            style={{ marginTop: "2%", marginLeft: "45%" }}
          >
            Solicitar
          </button>
        </div>

        <style>{`
          .listaCredenciales {
            padding: 2%;
            margin: 2%;
            border: 2px solid rgb(84, 84, 84);
            border-radius: 10px;
          }
          .checkboxes {
            padding-left: 4%;
          }
          .form-check-label {
            font-size: 20px;
          }
          .form-check-input {
            width: 20px;
            height: 20px;
          }
        `}</style>
      </div>
    </>
  );
};

export default StudentMicrocredentialPage;