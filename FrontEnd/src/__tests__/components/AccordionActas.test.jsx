import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AccordionActas from '../../components/AccordionActas';
import { vi } from 'vitest';

// Mock del componente AccordionItemActas para simplificar tests
vi.mock('../../components/AccordionItemActas', () => {
  return {
    default: ({ NIA, estado_curso }) => (
      <div data-testid="accordion-item">
        <span>{NIA}</span> - <span>{estado_curso}</span>
      </div>
    )
  };
});

// Mock global.fetch para simular respuestas del backend
global.fetch = vi.fn();

describe('<AccordionActas />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza títulos y mensajes cuando no hay estudiantes', async () => {
    // Mock para obtener idCurso
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'curso123' }),
    });

    // Mock para obtener estudiantes vacío
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ estudiantes: [] }),
    });

    render(<AccordionActas curso="Curso Test" />);

    // Esperar a que las dos llamadas fetch se completen
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    expect(screen.getByText('Estudiantes Pendientes')).toBeInTheDocument();
    expect(screen.getByText('Aprobados')).toBeInTheDocument();

    expect(screen.getByText('No hay estudiantes pendientes')).toBeInTheDocument();
    expect(screen.getByText('No hay estudiantes aceptados')).toBeInTheDocument();
  });

  test('renderiza estudiantes pendientes y aceptados correctamente', async () => {
    // Mock idCurso
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'curso123' }),
    });

    // Mock estudiantes con diferentes estados
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        estudiantes: [
          { NIA: '1', estado_curso: 'en proceso' },
          { NIA: '2', estado_curso: 'aceptada' },
          { NIA: '3', estado_curso: 'rechazada' }, // No debe mostrarse
        ],
      }),
    });

    render(<AccordionActas curso="Curso Test" />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    // Debería haber dos AccordionItemActas (uno pendiente y uno aceptado)
    const items = screen.getAllByTestId('accordion-item');
    expect(items.length).toBe(2);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    // No deberían mostrarse mensajes de "No hay estudiantes"
    expect(screen.queryByText('No hay estudiantes pendientes')).not.toBeInTheDocument();
    expect(screen.queryByText('No hay estudiantes aceptados')).not.toBeInTheDocument();
  });
});
