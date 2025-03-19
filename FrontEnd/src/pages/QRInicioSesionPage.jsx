import React, { useEffect, useState } from "react";
import logoDeusto from "../assets/images/LogoDeusto.png";
import QRCode from "react-qr-code";

const QRInicioSesionPage = () => {
  const verificationUrl = `http://localhost:3000/verificar`; // URL de la API de verificación
  const [verificationData, setVerificationData] = useState(null);
  const [copyButtonText, setCopyButtonText] = useState(
    "Copiar respuesta al portapapeles"
  );

  useEffect(() => {
    const verifyCredential = async () => {
      try {
        const response = await fetch(verificationUrl, { method: "POST" });
        let data = await response.text(); // Obtener el texto de la respuesta
        data = data.replace(/^"(.*)"$/, "$1");
        setVerificationData(data); // Guardar el texto de la respuesta
        setVerificationStatus("verified"); // O ajusta según la respuesta que esperes
      } catch (error) {
        console.error("Error en la verificación:", error);
        setVerificationStatus("error");
      }
    };

    verifyCredential();
  }, [verificationUrl]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(verificationData)
      .then(() => {
        setCopyButtonText("Copiado"); // Cambia el texto a "Copiado"
        setTimeout(
          () => setCopyButtonText("Copiar respuesta al portapapeles"),
          4000
        ); // Vuelve al original después de 2 segundos
      })
      .catch((error) => {
        console.error("Error al copiar al portapapeles", error);
      });
  };

  return (
    <div className="container">
      <img src={logoDeusto} alt="Deusto Logo" className="logo-deusto" />
      <div className="wallet-box">
        <h1>Comparte tu EducationalID</h1>
        {verificationData ? (
          <QRCode value={verificationData} size={200} />
        ) : (
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
        <p className="verification-text">
          Escanea el código con walt.id para verificar.
        </p>
        <div className="separator">
          <hr />
          <span>o</span>
          <hr />
        </div>
        <button onClick={copyToClipboard} className="btnCopiar">
          {copyButtonText}
        </button>
        
      </div>

      <style jsx>{`
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: #e6e7e8;
          overflow: hidden; /* Evitar el scroll */
        }
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 100%;
          padding: 10px;
          box-sizing: border-box; /* Asegurarse de que padding no afecte el tamaño */
          text-align: center;
          transform: scale(0.9); /* 🔹 Simula el 90% de zoom */
          transform-origin: top center;
        }
        .verification-text {
          white-space: nowrap; /* Evitar el salto de línea */
          padding-top: 13px;
          overflow: hidden;
          text-overflow: ellipsis; /* Agregar puntos suspensivos si el texto es muy largo */
          font-size: 17px; /* Reducir el tamaño si es necesario */
        }
        .separator {
          display: flex;
          align-items: center;
          margin-top: -14px;
          margin-bottom: 5px;
        }
        .separator hr {
          flex-grow: 1;
          border: 1.5px solid #000000;
        }
        .separator span {
          margin: 0 8px;
          font-size: 16px;
        }
        .logo-deusto {
          width: 250px; /* Ajusta el tamaño del logo */
          margin-bottom: 10px; /* Espacio debajo del logo */
          margin-top: 50px;
        }
        .wallet-box {
          background-color: #ffffff;
          padding: 25px;
          margin-top: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }
        .btnCopiar {
          background: none;
          border: none;
          color: #007bff; /* Azul de Bootstrap */
          text-decoration: none;
          font-size: 1rem;
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

        h1 {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .wallet-logo {
          width: 25px;
          height: 25px;
          margin-right: 10px;
        }
        @media (min-width: 1600px) {
          .logo-deusto {
            max-width: 300px; /* Logo más grande */
          }

          .wallet-box {
            max-width: 600px; /* Caja más grande */
            padding: 40px;
          }

          .verification-text {
            font-size: 20px;
          }

          .verification-data-box {
            max-height: 200px; /* Más espacio para los datos */
          }

          .copy-button {
            font-size: 20px;
            padding: 14px 20px;
          }
        }
        @media (max-width: 600px) {
          .logo-deusto {
            width: 620px; /* Tamaño más pequeño en pantallas pequeñas */
          }
          .wallet-box {
            padding: 15px;
          }
          h1 {
            font-size: 16px;
          }
          .wallet-button {
            padding: 8px;
          }
          .verification-text {
            font-size: 12px; /* Tamaño más pequeño en pantallas pequeñas */
          }
        }
      `}</style>
    </div>
  );
};

export default QRInicioSesionPage;