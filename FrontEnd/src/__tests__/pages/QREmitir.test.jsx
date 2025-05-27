import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import QREmitir from '../../pages/QREmitir';
import { useStudent } from '../../components/StudentContext';
import { MemoryRouter, Route } from 'react-router-dom';

// Mock del contexto student
vi.mock('../../components/StudentContext', () => ({
  useStudent: vi.fn(),
}));

// Mock del hook useLocation de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({
      state: { selectedCourseNames: ['Curso de prueba'] },
    }),
  };
});

// Mock global fetch
global.fetch = vi.fn();

describe('QREmitir', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra logo y texto inicial', () => {
    useStudent.mockReturnValue({ studentInfo: null });

    render(
      <MemoryRouter>
        <QREmitir />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Deusto Logo/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Obten tu Microcredencial:');
  });

  it('muestra spinner mientras issuanceData es null', () => {
    useStudent.mockReturnValue({ studentInfo: null });

    render(
      <MemoryRouter>
        <QREmitir />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText(/Loading/i)).toBeInTheDocument();
  });

  it('muestra QRCode cuando issuanceData está cargado', async () => {
    // Simulamos studentInfo con datos para disparar fetch
    useStudent.mockReturnValue({
      studentInfo: {
        correo: 'test@mail.com',
        fecha_nacimiento: '2000-01-01',
        nombre: 'Nombre',
        primer_apellido: 'Apellido1',
        segundo_apellido: 'Apellido2',
        dni: '12345678A',
      },
    });

    // Mock fetch devuelve un texto para issuanceData
    fetch.mockResolvedValue({
      text: vi.fn().mockResolvedValue('"valor-emision"'),
    });

    render(
      <MemoryRouter>
        <QREmitir />
      </MemoryRouter>
    );

    // Esperamos que desaparezca el spinner y aparezca el QRCode (un svg dentro)
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(screen.getByText(/Escanea el código/i)).toBeInTheDocument();
      // El componente QRCode genera un <svg>, comprobamos que esté en el DOM
      expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    });
  });

  it('botón copiar cambia texto al hacer click', async () => {
  useStudent.mockReturnValue({
    studentInfo: {
      correo: 'test@mail.com',
      fecha_nacimiento: '2000-01-01',
      nombre: 'Nombre',
      primer_apellido: 'Apellido1',
      segundo_apellido: 'Apellido2',
      dni: '12345678A',
    },
  });

  fetch.mockResolvedValue({
    text: vi.fn().mockResolvedValue('"valor-emision"'),
  });

  // Mock para clipboard
  Object.assign(navigator, {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
  });

  render(
    <MemoryRouter>
      <QREmitir />
    </MemoryRouter>
  );

  // Esperar a que cargue el QRCode (issuanceData)
  await waitFor(() => expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument());

  const btn = screen.getByRole('button', { name: /Copiar respuesta al portapapeles/i });

  fireEvent.click(btn);

  // Esperar que el texto cambie a "Copiado"
  await waitFor(() => {
    expect(btn).toHaveTextContent('Copiado');
  });
});

});
