import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import CursoPage from '../../pages/CursoPage'

vi.mock('react-helmet', () => ({
    Helmet: ({ children }) => <>{children}</>,
}))

// Mock de useNavigate para poder espiar llamadas a navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

describe('CursoPage', () => {
    const renderWithRouter = (state = {}) => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/curso', state }]}>
                <Routes>
                    <Route path="/curso" element={<CursoPage />} />
                </Routes>
            </MemoryRouter>
        )
    }

    it('muestra los datos del curso correctamente', () => {
        const state = {
            nombre: 'Curso de React',
            descripcion: 'Aprende React desde cero',
            duracion: '4 semanas',
            requisitos: 'Conocimientos básicos de JavaScript',
        }

        renderWithRouter(state)

        expect(screen.getAllByText('Curso de React')).toHaveLength(3)
        expect(screen.getByText('Aprende React desde cero')).toBeInTheDocument()
        expect(screen.getByTestId('duracion-texto')).toHaveTextContent('4 semanas horas de formación presencial o en presencia virtual')
        expect(screen.getByRole('button', { name: /solicita más información/i })).toBeInTheDocument()
    })

    it('no rompe si no se pasa location.state', () => {
        renderWithRouter()

        // No debería lanzar errores ni romper el render
        expect(screen.queryByText('Curso de')).not.toBeInTheDocument()
    })

    it('navega correctamente al pulsar el botón de requisitos', async () => {
        const state = {
            nombre: 'Curso de React',
            descripcion: 'Aprende React desde cero',
            duracion: '4 semanas',
            requisitos: 'Conocimientos básicos de JavaScript',
        }

        renderWithRouter(state)

        const button = screen.getByRole('button', { name: /solicita más información/i })
        await userEvent.click(button)

        expect(mockNavigate).toHaveBeenCalledWith('/prerequisites', {
            state
        })
    })
})
