import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StudentPortalPage from '../../pages/StudentPortalPage';
import { BrowserRouter } from 'react-router-dom';


// Mock del hook useLocation de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/studentPortal' }),
  };
});

// Mock del hook useStudent para que no devuelva null
vi.mock("../../components/StudentContext", () => {
  return {
    useStudent: () => ({
      studentInfo: { nombre: "Juan", nia: "12345678", email: "test@gmail.com", dniPasaporte: "12345678A", primerApellido: "Pérez", segundoApellido: "Gómez" },
    }),
  };
});

describe('StudentPortalPage', () => {
  it('renderiza todos los botones de aplicaciones', () => {
    render(
      <BrowserRouter>
        <StudentPortalPage />
      </BrowserRouter>
    );

    // Comprobamos textos estáticos esperados
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Aplicaciones')).toBeInTheDocument();

    // Botones esperados
    const buttons = [
      'Grado /master /doctorado',
      'Formación continua /idiomas',
      'Evaluación docencia',
      'Solicitud beca deusto',
      'Publicación horaria',
      'Solicitud de títulos',
    ];

    // Comprobamos que cada botón esté en el documento
    buttons.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
