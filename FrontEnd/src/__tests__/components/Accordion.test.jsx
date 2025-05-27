import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import Accordion from '../../components/Accordion';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  })
);

describe('<Accordion />', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  test('renders the "Solicitantes", "Solicitudes aceptadas", and "Solicitudes rechazadas" headings', () => {
    render(<Accordion curso="Test Curso" />);
    expect(screen.getByRole('heading', { name: 'Solicitantes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Solicitudes aceptadas' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Solicitudes rechazadas' })).toBeInTheDocument();
  });

  test('displays "No hay solicitudes" in the pending section when no pending items are fetched', async () => {
    render(<Accordion curso="Test Curso" />);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Aquí cambiamos la selección a buscar el texto directamente sin asumir roles
    expect(await screen.findByText('No hay solicitudes')).toBeInTheDocument();
  });

  test('displays "No hay solicitudes aceptadas" in the accepted section', async () => {
    render(<Accordion curso="Test Curso" />);
    expect(await screen.findByText('No hay solicitudes aceptadas')).toBeInTheDocument();
  });

  test('displays "No hay solicitudes rechazadas" in the rejected section', async () => {
    render(<Accordion curso="Test Curso" />);
    expect(await screen.findByText('No hay solicitudes rechazadas')).toBeInTheDocument();
  });
});
