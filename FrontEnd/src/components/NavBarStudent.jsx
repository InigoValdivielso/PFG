import { useNavigate } from "react-router-dom";
import logoDeusto from "../assets/images/LogoDeustoBlanco.png";
import { useStudent } from "./StudentContext";


function NavBarStudent() {
  const navigate = useNavigate();
  const { studentInfo } = useStudent();

  const logOut = () => {
    localStorage.removeItem("studentInfo");
    navigate("/studentLogin");
  };

    const handleButtonClick = () => {
      navigate("/microcredentials");
    };
  return (
    <>
      <div style={{backgroundColor: "#313338", width: "100%", position: "fixed", zIndex: "1000", padding: "0", margin: "0"}}>
        <img src={logoDeusto} alt="logo Deusto" style={{width: "10%", padding: "0.5%"}} />
        <div class="btn-group" id="menu" style={{marginRight: "2%", marginLeft:"80%"}}>
          <button
            class="btn btn-secondary btn-sm dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="botonMenu"
            style={{backgroundColor: "#313338"}}
          >
            <span class="material-symbols-outlined" id="icono">account_circle</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-lg-end" id="submenu" style={{boxShadow: "0px 0px 10px 0px #000000"}}>
            <li><p class="dropdown-item" style={{fontSize: "90%"}}>Hola {studentInfo?.nombre}!</p></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="" onClick={() => handleButtonClick()} style={{fontSize: "90%"}}>Mi perfil</a></li>
            <li><a class="dropdown-item" href="#" style={{fontSize: "90%"}}>Acerca de</a></li>
            <li><a class="dropdown-item" href="#" style={{fontSize: "90%"}}>Contacto</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="" style={{fontSize: "90%"}} onClick={() => logOut()}>Log out</a></li>   
          </ul>
        </div>
      </div>
    </>
  );
}
export default NavBarStudent;
