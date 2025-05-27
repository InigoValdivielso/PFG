import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import QRPrerequisitesPage from '../../pages/QRPrerequisitesPage'; // ajusta el path si es necesario

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn()
  };
});

describe('QRPrerequisitesPage', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = vi.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve('"mocked-verification-data"')
      })
    );

    // Mock clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve())
      }
    });

    // Mock location state
    useLocation.mockReturnValue({
      state: {
        nombresRequisitos: [
          'Aprendizaje automático supervisado: Regresión y clasificación',
          'Algoritmos avanzados de aprendizaje'
        ]
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('muestra el logo y el título correctamente', async () => {
    render(
      <MemoryRouter>
        <QRPrerequisitesPage />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Deusto Logo')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Comparte tu EducationalID/i
      })
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Escanea el código con walt.id/i)).toBeInTheDocument()
    );
  });

  it('renderiza el QRCode tras obtener verificationData', async () => {
    render(
      <MemoryRouter>
        <QRPrerequisitesPage />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Escanea el código con walt.id/i)).toBeInTheDocument()
    );

    const qr = screen.getByRole('img'); // react-qr-code uses an <svg role="img">
    expect(qr).toBeInTheDocument();
  });

  it('cambia el texto del botón después de copiar', async () => {
    render(
      <MemoryRouter>
        <QRPrerequisitesPage />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(/Copiar respuesta/i));

    const copyButton = screen.getByRole('button', { name: /Copiar respuesta/i });
    await userEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("mocked-verification-data");
    expect(await screen.findByText("Copiado")).toBeInTheDocument();
  });
});
