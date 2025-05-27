import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import QRInicioSesionPage from '../../pages/QRInicioSesionPage';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { StudentProvider } from '../../components/StudentContext';

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useLocation: () => ({
            search: '',
        }),
        useNavigate: vi.fn(),
    };
});

describe('QRInicioSesionPage', () => {
    beforeEach(() => {
        global.fetch = vi.fn()
            .mockResolvedValueOnce({
                text: () => Promise.resolve('"some-verification-data"'),
                ok: true,
            })
            .mockResolvedValue({
                json: () => Promise.resolve({}),
                ok: true,
            });
        global.crypto = {
            randomUUID: () => 'mocked-token-uuid',
        };
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renderiza correctamente el logo y texto principal', async () => {
        render(
            <MemoryRouter>
                <StudentProvider>
                    <QRInicioSesionPage />
                </StudentProvider>
            </MemoryRouter>
        );

        expect(await screen.findByAltText('Deusto Logo')).toBeInTheDocument();
        expect(screen.getByText('Comparte tu EducationalID')).toBeInTheDocument();
    });

    it('muestra el QR una vez que verificationData está disponible', async () => {
        render(
            <MemoryRouter>
                <StudentProvider>
                    <QRInicioSesionPage />
                </StudentProvider>
            </MemoryRouter>
        );

        await waitFor(() => {
            const qrCode = screen.getByText((content, element) =>
                element?.tagName.toLowerCase() === 'svg'
            );
            expect(qrCode).toBeInTheDocument();
        });
    });

    it('copia al portapapeles correctamente', async () => {
        const writeTextMock = vi.fn().mockResolvedValue();

        Object.defineProperty(navigator, 'clipboard', {
            value: {
                writeText: writeTextMock
            },
            writable: true,
        });

        render(
            <MemoryRouter>
                <StudentProvider>
                    <QRInicioSesionPage />
                </StudentProvider>
            </MemoryRouter>
        );

        // Espera al botón
        await waitFor(() => screen.getByRole('button', { name: /copiar/i }));
        const copyButton = screen.getByRole('button', { name: /copiar/i });

        copyButton.click();

        await waitFor(() => {
            expect(copyButton).toHaveTextContent('Copiado');
        });
    });
});
