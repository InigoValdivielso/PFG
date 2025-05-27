import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import StudentMicrocredentialPage from '../../pages/StudentMicrocredentialPage';
import { useStudent } from '../../components/StudentContext';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../components/StudentContext', () => ({
  useStudent: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

const mockStudentInfo = {
  NIA: '123456',
  dni: '11111111A',
  nombre: 'Juan',
  primer_apellido: 'Pérez',
  segundo_apellido: 'López',
  correo: 'juan@example.com',
  cursos: [1, 2],
};

describe('StudentMicrocredentialPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useStudent.mockReturnValue({ studentInfo: mockStudentInfo });

    global.fetch = vi.fn()
      // Primer fetch para estudiante/1
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          estudiantes: [{ dni: '11111111A', estado_curso: 'aceptada' }],
        }),
      })
      // Segundo fetch para curso/1
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ nombre: 'Curso Uno' }),
      })
      // Primer fetch para estudiante/2
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          estudiantes: [{ dni: '11111111A', estado_curso: 'rechazada' }],
        }),
      });
  });

  it('renderiza información personal y lista de microcredenciales', async () => {
    render(
      <BrowserRouter>
        <StudentMicrocredentialPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Juan')).toBeInTheDocument();
      expect(screen.getByText('Pérez')).toBeInTheDocument();
      expect(screen.getByText('Curso Uno')).toBeInTheDocument();
    });

    const checkbox = screen.getByLabelText('Curso Uno');
    fireEvent.click(checkbox);

    const boton = screen.getByRole('button', { name: /solicitar/i });
    expect(boton).not.toBeDisabled();
  });
});
