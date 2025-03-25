import React, { useState } from "react";
import Accordion from "../components/Accordion";

const SecretaryPage = () => {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState("");

  const handleSelectChange = (event) => {
    setComponenteSeleccionado(event.target.value);
  };

  const renderComponente = () => {
    switch (componenteSeleccionado) {
      case "Componente1":
        return <Accordion />;
      case "Componente2":
        return <Accordion />;
      case "Componente3":
        return <Accordion />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1
        className="titulo"
        style={{
          textAlign: "center",
          paddingBottom: "2%",
          fontWeight: "800",
          color: "#0153CE",
        }}
      >
        Solicitudes de Ingreso
      </h1>

      <select
        class="form-select form-select-lg mb-3"
        aria-label="Large select example"
        onChange={handleSelectChange}
        value={componenteSeleccionado}
      >
        <option selected>Selecciona un programa</option>
        <option value="Componente1">Transformación Digital para PYMEs</option>
        <option value="Componente2">Experto en Derecho Digital</option>
        <option value="Componente3">
          Ejecutivo en Administración de Empresas - Máster en Formación a lo
          Largo de la Vida
        </option>
        <option value="3">
          Máster Ejecutivo en Administración de Empresas
        </option>
        <option value="4">Diploma de Experto en Derecho Sanitario</option>
        <option value="5">
          Experto en prevención de adicciones con adolescentes y jóvenes
        </option>
        <option value="6">
          Experto en Ética de la digitalización e Inteligencia Artificial
          aplicada
        </option>
        <option value="7">Experto en Dirección General (PDG)</option>
        <option value="8">
          Experto en Derechos Humanos de los Pueblos Indígenas
        </option>
      </select>

      <br></br>

      {renderComponente()}
    </>
  );
};
export default SecretaryPage;
