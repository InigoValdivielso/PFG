import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentLoginPage from '../../pages/StudentLoginPage';

// Mock para useNavigate
const mockedNavigate = vi.fn();

// Mock react-router-dom: mantenemos todo excepto useNavigate y Link
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

// Mock del context useStudent
const mockSetStudentInfo = vi.fn();
vi.mock('../../components/StudentContext', () => ({
  useStudent: () => ({
    setStudentInfo: mockSetStudentInfo,
  }),
}));

// Creamos una función mock para controlar useGoogleLogin
const mockUseGoogleLogin = vi.fn();

// Mock global de useGoogleLogin que usa mockUseGoogleLogin
vi.mock('@react-oauth/google', () => ({
  useGoogleLogin: (options) => {
    // Llamamos a la implementación actualizada para el test
    return mockUseGoogleLogin.mockImplementation(() => {
      if (options.onSuccess) {
        options.onSuccess({ access_token: 'fake-access-token' });
      }
    })();
  },
}));

describe('StudentLoginPage', () => {
  beforeEach(() => {
    mockSetStudentInfo.mockReset();
    mockedNavigate.mockReset();
    mockUseGoogleLogin.mockReset();

    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renderiza la página y ejecuta flujo de login exitoso', async () => {
    const fakeUserData = { email: 'usuario@opendeusto.es' };
    const fakeBackendData = { id: 1, name: 'Alumno Prueba' };

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => fakeUserData,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => fakeBackendData,
      });

    // Comportamiento por defecto: onSuccess con token válido
    mockUseGoogleLogin.mockImplementation((options) => () => {
      if (options.onSuccess) options.onSuccess({ access_token: 'fake-access-token' });
    });

    render(<StudentLoginPage />);

    const googleLoginButton = screen.getByTestId('google-login-button');

    fireEvent.click(googleLoginButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        'https://www.googleapis.com/oauth2/v1/userinfo',
        expect.any(Object)
      );
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/sql/estudiante/correo?correo=usuario@opendeusto.es'
      );
      expect(mockSetStudentInfo).toHaveBeenCalledWith(fakeBackendData);
      expect(localStorage.getItem('studentInfo')).toBe(JSON.stringify(fakeBackendData));
      expect(sessionStorage.getItem('token')).toBe('fake-access-token');
      expect(mockedNavigate).toHaveBeenCalledWith('/studentPortal');
    });
  });

  it('muestra error si email no pertenece a dominio opendeusto.es', async () => {
    const fakeUserData = { email: 'usuario@gmail.com' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => fakeUserData,
    });

    // Comportamiento: onSuccess con token válido
    mockUseGoogleLogin.mockImplementation((options) => () => {
      if (options.onSuccess) options.onSuccess({ access_token: 'fake-access-token' });
    });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<StudentLoginPage />);

    fireEvent.click(screen.getByTestId('google-login-button'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('El correo no pertenece a @opendeusto.es');
    });

    consoleErrorSpy.mockRestore();
  });


  it('muestra error si fetch google userinfo falla', async () => {
    fetch.mockRejectedValueOnce(new Error('fetch error'));

    // Comportamiento: onSuccess con token válido
    mockUseGoogleLogin.mockImplementation((options) => () => {
      if (options.onSuccess) options.onSuccess({ access_token: 'fake-access-token' });
    });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<StudentLoginPage />);

    fireEvent.click(screen.getByTestId('google-login-button'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al obtener la información del usuario de Google:',
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it('muestra error si backend responde error', async () => {
    const fakeUserData = { email: 'usuario@opendeusto.es' };
    const fakeBackendData = { message: 'Error backend' };

    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => fakeUserData,
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => fakeBackendData,
      });

    // Comportamiento: onSuccess con token válido
    mockUseGoogleLogin.mockImplementation((options) => () => {
      if (options.onSuccess) options.onSuccess({ access_token: 'fake-access-token' });
    });

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<StudentLoginPage />);

    fireEvent.click(screen.getByTestId('google-login-button'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error del backend:', fakeBackendData);
    });

    consoleErrorSpy.mockRestore();
  });
});
