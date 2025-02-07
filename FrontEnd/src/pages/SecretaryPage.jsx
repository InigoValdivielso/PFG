import React, { useState } from 'react';
import Accordion from "../components/Accordion";

const SecretaryPage = () => {
  const [componenteSeleccionado, setComponenteSeleccionado] = useState('');

  const handleSelectChange = (event) => {
    setComponenteSeleccionado(event.target.value);
  };

  const renderComponente = () => {
    switch (componenteSeleccionado) {
      case 'Componente1':
        return <Accordion />;
      case 'Componente2':
        return <Accordion />;
      case 'Componente3':
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
        Enrollment requests
      </h1>

      <select class="form-select form-select-lg mb-3" aria-label="Large select example" onChange={handleSelectChange} value={componenteSeleccionado}>
        <option selected>Select a program</option>
        <option value="Componente1">Digital Transformation for SMEs</option>
        <option value="Componente2">Digital Law Expert</option>
        <option value="Componente3">Executive in Business Administration-Master of Lifelong Training</option>
        <option value="3">Executive Master in Business Administration</option>
        <option value="4">Expert Diploma in Health Law</option>
        <option value="5">Expert in addiction prevention with adolescents and young people</option>
        <option value="6">Expert in Ethics of digitalization and applied Artificial Intelligence</option>
        <option value="7">Expert in General Management (PDG)</option>
        <option value="8">Expert in Human Rights of Indigenous Peoples</option>
      </select>

      <br></br>

      {renderComponente()}
    </>
  );
};
export default SecretaryPage;
