import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBarSecretary from '../../components/NavBarSecretary';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Creamos el mock parcial de react-router-dom usando importOriginal
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const navigateMock = vi.fn();

describe('NavBarSecretary', () => {
  beforeEach(() => {
    navigateMock.mockClear();
    sessionStorage.clear();
  });

  it('renderiza el logo con alt correcto', async () => {
    // Importamos el BrowserRouter *dentro* del test para asegurar que no haya problemas de hoisting
    const { BrowserRouter } = await import('react-router-dom');

    render(
      <BrowserRouter>
        <NavBarSecretary />
      </BrowserRouter>
    );
    expect(screen.getByAltText('Logo Deusto')).toBeInTheDocument();
  });

  it('navega a /secretary cuando se clickea en "Solicitudes de Ingreso"', async () => {
    const { BrowserRouter } = await import('react-router-dom');

    render(
      <BrowserRouter>
        <NavBarSecretary />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/Solicitudes de Ingreso/i));
    expect(navigateMock).toHaveBeenCalledWith('/secretary');
  });

  it('navega a /secretaryActas cuando se clickea en "Actas"', async () => {
    const { BrowserRouter } = await import('react-router-dom');

    render(
      <BrowserRouter>
        <NavBarSecretary />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/Actas/i));
    expect(navigateMock).toHaveBeenCalledWith('/secretaryActas');
  });

  it('borra token y navega a /secretaryLogin cuando se clickea en "Cerrar sesión"', async () => {
    sessionStorage.setItem('token', '123abc');
    const { BrowserRouter } = await import('react-router-dom');

    render(
      <BrowserRouter>
        <NavBarSecretary />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/Cerrar sesión/i));
    expect(sessionStorage.getItem('token')).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith('/secretaryLogin');
  });
});
