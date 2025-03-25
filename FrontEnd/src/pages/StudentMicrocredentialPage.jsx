import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarStudent from "../components/NavBarStudent";

const StudentMicrocredentialPage = ({
  nia,
  dni,
  nombre,
  apellido1,
  apellido2,
  genero,
  email,
  program,
}) => {
  const navigate = useNavigate();
  const loadedNia = "123456";
  const loadedDni = "12345678A";
  const loadedName = "Juan";
  const loadedFirstSurname = "Perez";
  const loadedSecondSurname = "Garcia";
  const loadedGender = "Male";
  const loadedEmail = "juan@opendeusto.es";
  const loadedProgram = "Digital Transformation for SMEs";

  const [checkedItems, setCheckedItems] = useState(() => ({
    educationalID: false,
    microcredencial1: false,
    microcredencial2: false,
    microcredencial3: false,
  }));

  const initialize = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleButtonClick = () => {
    navigate("/microcredentials/solicitar/EducationalID");
  };

  useEffect(() => {
    const executeInitialization = async () => {
      await initialize();
      setIsLoading(false);
    };
    executeInitialization();
  }, []);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    setCheckedItems({
      educationalID: newState,
      microcredencial1: newState,
      microcredencial2: newState,
      microcredencial3: newState,
    });
  };
  useEffect(() => {
    setSelectAll(Object.values(checkedItems).every(Boolean));
  }, [checkedItems]);

  const handleCheckboxChange = (name) => {
    setCheckedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  const isAnyChecked = Object.values(checkedItems).some(Boolean);
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
              <td style={{ background: "#EBEBEB" }}>{loadedNia}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                DNI, Pasaporte
              </td>
              <td style={{ background: "#EBEBEB" }}>{loadedDni}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Nombre
              </td>
              <td style={{ background: "#EBEBEB" }}>{loadedName}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Primer Apellido
              </td>
              <td style={{ background: "#EBEBEB" }}>{loadedFirstSurname}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Segundo Apellido
              </td>
              <td style={{ background: "#EBEBEB" }}>{loadedSecondSurname}</td>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Genero
              </td>
              <td style={{ background: "#EBEBEB" }}>{loadedGender}</td>
            </tr>
            <tr>
              <td style={{ background: "#EBEBEB", fontWeight: "bold" }}>
                Email
              </td>
              <td style={{ background: "#EBEBEB" }}>{loadedEmail}</td>
              <td style={{ background: "#EBEBEB" }}></td>
              <td style={{ background: "#EBEBEB" }}></td>
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
            {Object.keys(checkedItems).map((key, index) => (
              <div className="form-check form-switch" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={key}
                  checked={checkedItems[key]}
                  onChange={() => handleCheckboxChange(key)}
                />
                <label className="form-check-label" htmlFor={key}>
                  {key === "educationalID"
                    ? "EducationalID"
                    : `Ejemplo de Microcredencial ${index}`}
                </label>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" id="boton" type="submit" onClick={() => handleButtonClick()} disabled={!isAnyChecked} style={{marginTop: "2%", marginLeft: "45%"}}>
            Solicitar
          </button>
        </div>

        <style jsx>{`
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
