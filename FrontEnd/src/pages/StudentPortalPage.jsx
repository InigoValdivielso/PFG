import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import NavBarStudent from "../components/NavBarStudent";

const StudentPortalPage = () => {
  const location = useLocation();
  const studentInfo = location.state;
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <NavBarStudent />

      <div style={{ paddingTop: "5%" }}>
        <p
          style={{
            paddingTop: "4%",
            marginLeft: "2%",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: "200%",
          }}
        >
          Inicio
        </p>
        <div
          style={{
            marginLeft: "3%",
            marginRight: "3%",
            borderStyle: "solid",
            borderTopWidth: "2px",
            borderTopColor: "#1B459A",
            borderLeftWidth: "1px",
            borderRightWidth: "1px",
            borderBottomWidth: "1px",
          }}
        >
          <p style={{ paddingLeft: "2%", paddingTop: "1%" }}>Aplicaciones</p>
          <div style={styles.buttonContainer}>
            <button style={styles.buttonBlue}>
              Grado /master /doctorado
            </button>
            <button style={styles.buttonOrange}>
              Formación continua /idiomas
            </button>
            <button style={styles.buttonRed}>
              Evaluación docencia
            </button>
            <button style={styles.buttonDark}>
              Solicitud beca deusto
            </button>
            <button style={styles.buttonGreen}>
              Publicación horaria
            </button>
            <button style={styles.buttonViolet}>
              Solicitud de títulos
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  buttonContainer: {
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingBottom: "2%",
    display: "flex",
    flexWrap: "wrap",  // Permite que los botones se adapten en varias filas
    gap: "20px",       // Espacio entre botones
  },
  buttonBlue: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "250px",   /* Define un tamaño mínimo para los botones */
    height: "70px",       /* Altura fija */
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#76C4ED",
    border: "none",
  },
  buttonOrange: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#EFA131",
    border: "none",
  },
  buttonRed: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#C0392B",
    border: "none",
  },
  buttonDark: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#34495E",
    border: "none",
  },
  buttonGreen: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "270px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#85C744",
    border: "none",
  },
  buttonViolet: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "257px",   /* Limita el tamaño máximo del botón */
    minWidth: "269px",   /* Define un tamaño mínimo para los botones */
    height: "70px",
    textAlign: "right",
    paddingTop: "36px",
    paddingRight: "15px",
    fontSize: "105%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#9358AC",
    border: "none",
  }
};


export default StudentPortalPage;
