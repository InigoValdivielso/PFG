import { Link } from "react-router-dom";
import NavBarStudent from "../components/NavBarStudent";

const StudentPortalPage = () => {
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
          Home
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
          <p style={{ paddingLeft: "2%", paddingTop: "1%" }}>Applications</p>
          <div style={styles.buttonContainer}>
            <button style={styles.buttonBlue}>
              Undergraduate/Master's/Doctorate
            </button>
            <button style={styles.buttonOrange}>
              Continuing Education/Languages
            </button>
            <button style={styles.buttonRed}>
              Teaching Evaluation
            </button>
            <button style={styles.buttonDark}>
              Deusto Scholarship Application
            </button>
            <button style={styles.buttonGreen}>
              Schedule Publication
            </button>
            <Link to="/microcredentials">
              <button style={styles.buttonPurple}>
                Microcredentials Application
              </button>
            </Link>
            <button style={styles.buttonViolet}>
              Degree Application
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
    height: "60px",       /* Altura fija */
    textAlign: "right",
    paddingTop: "30px",
    paddingRight: "15px",
    paddingBottom: "5px",
    fontSize: "90%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#76C4ED",
    border: "none",
  },
  buttonOrange: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "60px",
    textAlign: "right",
    paddingTop: "30px",
    paddingRight: "15px",
    paddingBottom: "5px",
    fontSize: "90%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#EFA131",
    border: "none",
  },
  buttonRed: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "60px",
    textAlign: "right",
    paddingTop: "30px",
    paddingRight: "15px",
    paddingBottom: "5px",
    fontSize: "90%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#C0392B",
    border: "none",
  },
  buttonDark: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "60px",
    textAlign: "right",
    paddingTop: "30px",
    paddingRight: "15px",
    paddingBottom: "5px",
    fontSize: "90%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#34495E",
    border: "none",
  },
  buttonGreen: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "60px",
    textAlign: "right",
    paddingTop: "30px",
    paddingRight: "15px",
    paddingBottom: "5px",
    fontSize: "90%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#85C744",
    border: "none",
  },
  buttonPurple: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "450px",   /* Limita el tamaño máximo del botón */
    minWidth: "257px",   /* Define un tamaño mínimo para los botones */
    height: "60px",
    textAlign: "right",
    paddingTop: "30px",
    paddingRight: "15px",
    paddingBottom: "5px",
    fontSize: "90%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#c06dce",
    border: "none",
  },
  buttonViolet: {
    flex: "1",  // Flexibilidad y tamaño base
    maxWidth: "257px",   /* Limita el tamaño máximo del botón */
    minWidth: "250px",   /* Define un tamaño mínimo para los botones */
    height: "60px",
    textAlign: "right",
    paddingTop: "30px",
    paddingRight: "15px",
    paddingBottom: "5px",
    fontSize: "90%",
    color: "white",
    borderRadius: "7px",
    backgroundColor: "#9358AC",
    border: "none",
  }
};


export default StudentPortalPage;
