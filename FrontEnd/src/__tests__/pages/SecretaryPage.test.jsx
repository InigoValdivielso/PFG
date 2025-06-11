import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SecretaryPage from '../../pages/SecretaryPage'; // Ajusta ruta
import React from 'react';

// Mock del componente Accordion para aislar test
vi.mock('../../components/Accordion', () => {
  return {
    default: ({ curso }) => <div data-testid="accordion-mock">Accordion for {curso}</div>,
  };
});

describe('SecretaryPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renderiza título y select vacío inicialmente', () => {
    render(<SecretaryPage />);
    expect(screen.getByText('Solicitudes de Ingreso')).toBeDefined();
    expect(screen.getByRole('combobox')).toBeDefined();
    expect(screen.getByRole('option', { name: 'Selecciona un curso' })).toBeDefined();
  });

  it('carga y muestra opciones de cursos tras fetch', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ cursos: ['Curso A', 'Curso B', 'Curso C'] }),
    });

    render(<SecretaryPage />);

    // Esperamos que se muestren las opciones recibidas
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Curso A' })).toBeDefined();
      expect(screen.getByRole('option', { name: 'Curso B' })).toBeDefined();
      expect(screen.getByRole('option', { name: 'Curso C' })).toBeDefined();
    });
  });

  it('al seleccionar un curso muestra el componente Accordion', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ cursos: ['Curso A', 'Curso B'] }),
    });

    render(<SecretaryPage />);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Curso A' })).toBeDefined();
    });

    // Seleccionamos "Curso A"
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Curso A' } });

    // Comprobamos que el Accordion se muestra con el curso correcto
    expect(screen.getByTestId('accordion-mock')).toHaveTextContent('Accordion for Curso A');
  });

  it('no muestra Accordion si no hay selección', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ cursos: ['Curso X'] }),
    });

    render(<SecretaryPage />);

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Curso X' })).toBeDefined();
    });

    // Valor por defecto es vacío
    expect(screen.queryByTestId('accordion-mock')).toBeNull();
  });

  it('maneja error de fetch sin romper', async () => {
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<SecretaryPage />);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al obtener los cursos:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
