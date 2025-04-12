import "bootstrap/dist/css/bootstrap.min.css";
import { CheckCircle, Share2 } from "lucide-react";
import logoWaltid from "../assets/images/LogoWaltid.png";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const SuccessPage = () => {
  const { id } = useParams();
  const [flipped, setFlipped] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [clicked, setClicked] = useState(false); // Estado para controlar si el botón fue clickeado
  const navigate = useNavigate(); 

  const handleMouseEnter = () => {
    setFlipped(true); // Voltea la tarjeta al entrar el cursor
  };

  const handleMouseLeave = () => {
    setFlipped(false); // Vuelve a su forma original cuando sale el cursor
  };

  const handleButtonMouseEnter = () => {
    if (!clicked) {  // Solo mostrar el tooltip si no se ha hecho clic
      setTooltipVisible(true); // Muestra el mensaje cuando el cursor entra al botón
    }
  };

  const handleButtonMouseLeave = () => {
    setTooltipVisible(false); // Oculta el mensaje cuando el cursor sale del botón
  };

  const handleButtonClick = async () => {
    setClicked(true); // Cambia el estado a "clickeado" cuando el botón es presionado
    setTooltipVisible(false); // Oculta el tooltip cuando se hace clic

    try{
        const response = await fetch(`http://localhost:3000/verificar/infoSesionVerificacion/${id}`,{
            method: "GET",
            headers: {
                "accept": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error en la solicitud");
        }
    }catch (error) {
        console.error("Error al realizar la solicitud:", error);
    }
  };
  useEffect(() => {
    if (clicked) {
      localStorage.setItem("verificationComplete", "true");
      const timer = setTimeout(() => {
        navigate("/prerequisites"); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [clicked, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white shadow rounded p-4 text-center w-50 position-relative">
        <h2 className="mb-3">Credenciales Presentadas</h2>

        <div
          style={{
            position: "relative",
            width: "300px",
            height: "180px",
            perspective: "1000px", 
            marginBottom: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
          }}
        >
          {/* Contenedor de la tarjeta */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
              transition: "transform 0.6s",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)", 
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Parte frontal de la tarjeta */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "linear-gradient(to right, #05969F, #027C83)",
                color: "white",
                borderRadius: "15px",
                padding: "70px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backfaceVisibility: "hidden",
              }}
            >
              <p className="mb-0 fw-bold fs-5">Educational ID</p>
            </div>

            {/* Parte trasera de la tarjeta */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "#BABAB9",
                color: "black",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                padding: "70px",
              }}
            >
              <button className="btnCopiar">Compartir</button>
            </div>
          </div>
        </div>

        <p className="text-muted small mb-2">The VP was verified along with:</p>
        <div
          className="d-flex justify-content-between mx-auto"
          style={{ maxWidth: "450px" }}
        >
          <ul className="list-unstyled text-start">
            <li className="d-flex align-items-center mb-1">
              <CheckCircle className="text-success me-2" size={16} /> Signature
              Policy
            </li>
            <li className="d-flex align-items-center mb-1">
              <CheckCircle className="text-success me-2" size={16} /> Not-before
              Policy
            </li>
          </ul>
          <ul className="list-unstyled text-end">
            <li className="d-flex align-items-center text-muted">
              <CheckCircle className="text-secondary me-2" size={16} /> Expired
              Policy
            </li>
          </ul>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-3 text-muted small">
          <span>
            Secured by <strong>walt.id</strong>
          </span>
          <img
            src={logoWaltid}
            alt="Walt.id Logo"
            className="ms-2"
            style={{ width: "30px", height: "auto" }}
          />
        </div>
        
        {/* Icono Share2 como botón en la esquina inferior derecha */}
        <div className="position-relative">
          <button
            className={`share-btn position-absolute bottom-0 end-0 p-2 rounded-circle ${
              clicked ? "bg-success" : "bg-black" 
            }`}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            onClick={handleButtonClick} 
          >
            {clicked ? (
              <CheckCircle size={24} color="white" /> 
            ) : (
              <Share2 size={24} color="white" />
            )}
          </button>

          {/* Mensaje que se muestra cuando el cursor está sobre el botón */}
          {tooltipVisible && !clicked && (
            <div className="tooltip-message position-absolute bottom-100 end-0 mb-2 p-2 text-white rounded">
              Debes compartir el resultado con Secretaría
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        h2 {
          font-weight: 600;
        }
        .btnCopiar {
          background: none;
          border: none;
          color: #000000;
          text-decoration: none;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          display: inline;
          margin-bottom: 15px;
        }

        .btnCopiar:hover {
          text-decoration: underline;
          color: #0056b3; /* Azul más oscuro en hover */
        }

        .btnCopiar:focus,
        .btnCopiar:active {
          outline: none !important;
          box-shadow: none !important;
        }

        .share-btn {
          background-color: black;  /* Fondo negro por defecto */
          color: white;  /* Texto blanco */
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .share-btn:hover {
          background-color: #333; /* Fondo negro más oscuro en hover */
          transform: scale(1.1); /* Aumenta el tamaño al pasar el cursor */
        }

        .share-btn:focus {
          outline: none;
          box-shadow: none;
        }

        .tooltip-message {
          position: absolute;
          bottom: 45px; 
          left: 50%;
          transform: translateX(40%) translateY(-120%);
          background-color: rgba(105, 105, 105, 0.75);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 14px;
          visibility: visible;
          opacity: 1;
          transition: opacity 0.3s;
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
