import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SecretaryPage from '../../pages/SecretaryActas';

describe('SecretaryPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', (url) => {
      if (url.includes('/cursos/nombres')) {
        return Promise.resolve({
          json: () => Promise.resolve({ cursos: ['Curso A'] }),
        });
      }
      if (url.includes('/curso/nombre/Curso%20A')) {
        return Promise.resolve({
          json: () => Promise.resolve({ id: 'curso-id-a' }),
        });
      }
      if (url.includes('/estudiante/curso-id-a')) {
        return Promise.resolve({
          json: () =>
            Promise.resolve({
              estudiantes: [
                { NIA: '123', nombre: 'Juan', estado_curso: 'en proceso' },
              ],
            }),
        });
      }
      return Promise.reject(new Error('Not found'));
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('muestra AccordionActas cuando se selecciona un curso', async () => {
    render(<SecretaryPage />);

    const select = await screen.findByRole('combobox');
    fireEvent.change(select, { target: { value: 'Curso A' } });

    await waitFor(() => {
      expect(screen.getByText('Estudiantes Pendientes')).toBeDefined();
    });
  });
});
