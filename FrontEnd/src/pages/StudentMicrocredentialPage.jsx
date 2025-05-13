import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBarStudent from "../components/NavBarStudent";
import { useStudent } from "../components/StudentContext";

const StudentMicrocredentialPage = ({ }) => {
  const navigate = useNavigate();
  const { studentInfo } = useStudent();
  const [solicitableCredentialsInfo, setSolicitableCredentialsInfo] = useState([]);
  const [checkedCredentials, setCheckedCredentials] = useState({});
  const [selectAll, setSelectAll] = useState(false);

   const fetchCredentialInfoFromMongo = async (credencialId) => {
    try {
      const response = await fetch(`http://localhost:4000/credenciales/${credencialId}`); // Ruta a tu método de MongoDB
      if (!response.ok) {
        console.error(`Error fetching info from Mongo for ${credencialId}:`, response.status);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching info from Mongo for ${credencialId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAndProcessCredentials = async () => {
      if (studentInfo?.credenciales) {
        const solicitablesWithNames = [];
        const initialChecked = {};

        for (const credencialId of studentInfo.credenciales) {
          try {
            // Primero, verifica si la credencial es "solicitable"
            const statusResponse = await fetch(`http://localhost:8000/credenciales/${credencialId}`);
            if (!statusResponse.ok) {
              console.error(`Error fetching status for ${credencialId}:`, statusResponse.status);
              continue;
            }
            const statusData = await statusResponse.json();

            if (statusData?.estado === "solicitable") {
              const mongoInfo = await fetchCredentialInfoFromMongo(credencialId);
              let nameToShow = `Microcredencial ID: ${credencialId}`;
              if (mongoInfo?.presentationDefinition?.input_descriptors?.[0]?.id) {
                nameToShow = mongoInfo.presentationDefinition.input_descriptors[0].id;
              }

              solicitablesWithNames.push({
                id: credencialId,
                name: nameToShow,
              });
              initialChecked[credencialId] = false;
            }
          } catch (error) {
            console.error(`Error processing credencial ${credencialId}:`, error);
          }
        }

        setSolicitableCredentialsInfo(solicitablesWithNames);
        setCheckedCredentials(initialChecked);
      }
    };

    fetchAndProcessCredentials();
  }, [studentInfo?.credenciales]);

  const handleButtonClick = () => {
    const selectedCredentials = Object.keys(checkedCredentials).filter(
      (id) => checkedCredentials[id]
    );
    console.log("Credenciales seleccionadas:", selectedCredentials);
    navigate("/microcredentials/solicitar/EducationalID"); // Ejemplo de navegación
  };

  const handleSelectAll = () => {
    const newState = !selectAll;
    setSelectAll(newState);
    const updatedChecked = {};
    solicitableCredentialsInfo.forEach(credencial => {
      updatedChecked[credencial.id] = newState;
    });
    setCheckedCredentials(updatedChecked);
  };

  useEffect(() => {
    setSelectAll(
      solicitableCredentialsInfo.length > 0 &&
        solicitableCredentialsInfo.every(credencial => checkedCredentials[credencial.id])
    );
  }, [checkedCredentials, solicitableCredentialsInfo]);

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
            {solicitableCredentialsInfo.map((credencial) => (
              <div className="form-check form-switch" key={credencial.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={credencial.id}
                  checked={checkedCredentials[credencial.id] || false}
                  onChange={() => handleCheckboxChange(credencial.id)}
                />
                <label className="form-check-label" htmlFor={credencial.id}>
                  {credencial.name}
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