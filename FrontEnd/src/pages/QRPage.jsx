import React, { useEffect, useState } from "react";
import logoDeusto from "../assets/images/LogoDeusto.png";
import logoWaltid from "../assets/images/LogoWaltid.png";
import QRCode from "react-qr-code";

const QRPage = () => {
  const verificationUrl = `http://localhost:3000/verificar`; // URL de la API de verificación
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [verificationData, setVerificationData] = useState(null);  


  useEffect(() => {
    const verifyCredential = async () => {
      try {
        const response = await fetch(verificationUrl, { method: "POST" });
        const data = await response.text(); // Obtener el texto de la respuesta
        setVerificationData(data); // Guardar el texto de la respuesta
        console.log("Datos recibidos:", data); 
        setVerificationStatus("verified"); // O ajusta según la respuesta que esperes
      } catch (error) {
        console.error("Error en la verificación:", error);
        setVerificationStatus("error");
      }
    };

    verifyCredential();
  }, [verificationUrl]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verificationData).then(() => {
      alert("¡Datos copiados al portapapeles!");
    }).catch((error) => {
      console.error("Error al copiar al portapapeles", error);
    });
  };

  return (
    <div className="container">
      <img src={logoDeusto} alt="Deusto Logo" className="logo-deusto" />
      <div className="wallet-box">
        <h1>Comparte tu EducationalID</h1>
        <QRCode value={verificationUrl} size={200} />
        <p className="verification-text">Escanea el código con walt.id para verificar.</p>
        <div className="separator">
          <hr />
          <span>o</span>
          <hr />
        </div>
        <button onClick={copyToClipboard} className="copy-button">
          Copiar respuesta al portapapeles
        </button>
        {verificationStatus && (
          <p className={`status ${verificationStatus}`}>
            Estado: {verificationStatus === "verified" ? "✅ Verificado" : "❌ No verificado"}
          </p>
        )}

      </div>

      <style jsx>{`
        html, body, #root {
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
        }
        .verification-text {
          white-space: nowrap; /* Evitar el salto de línea */
          padding-top: 10px;
          overflow: hidden;
          text-overflow: ellipsis; /* Agregar puntos suspensivos si el texto es muy largo */
          font-size: 17px; /* Reducir el tamaño si es necesario */
        }
        .separator {
          display: flex;
          align-items: center;
          margin-top: -14px;
          margin-bottom: 20px;
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
          margin-bottom: 20px; /* Espacio debajo del logo */
        }
        .wallet-box {
          background-color: #ffffff;
          padding: 25px;
          margin-top: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
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
        @media (max-width: 600px) {
          .logo-deusto {
            width: 120px; /* Tamaño más pequeño en pantallas pequeñas */
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

export default QRPage;
