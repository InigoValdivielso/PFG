import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SecretaryLoginPage from '../../pages/SecretaryLoginPage'; 
import React from 'react';

// Mock useNavigate de react-router-dom
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('SecretaryLoginPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubGlobal('alert', vi.fn());
    sessionStorage.clear();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renderiza inputs y botón correctamente', () => {
    render(<SecretaryLoginPage />);
    expect(screen.getByPlaceholderText('Usuario')).toBeDefined();
    expect(screen.getByPlaceholderText('Contraseña')).toBeDefined();
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeDefined();
  });

  it('realiza login exitoso y navega a /secretary', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ status: 'success', token: 'token123' }),
    });

    render(<SecretaryLoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Usuario'), { target: { value: 'secretaryUser' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'secretPass' } });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    await waitFor(() => {
      expect(sessionStorage.getItem('token')).toBe('token123');
      expect(mockNavigate).toHaveBeenCalledWith('/secretary');
    });
  });

  it('muestra alerta si las credenciales son incorrectas', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ status: 'error' }),
    });

    render(<SecretaryLoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Usuario'), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'wrongPass' } });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Credenciales incorrectas');
      expect(sessionStorage.getItem('token')).toBeNull();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('maneja error de conexión sin romper', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<SecretaryLoginPage />);

    fireEvent.change(screen.getByPlaceholderText('Usuario'), { target: { value: 'user' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'pass' } });

    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }));

    // Espera un poco para que se complete la función async
    await waitFor(() => {
      // Aquí no debería navegar ni guardar token
      expect(sessionStorage.getItem('token')).toBeNull();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
