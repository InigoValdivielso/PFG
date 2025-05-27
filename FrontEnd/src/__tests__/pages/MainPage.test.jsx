import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import MainPage from '../../pages/MainPage'

// Mock react-router-dom useNavigate
const mockedNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  }
})

describe('MainPage', () => {
  beforeEach(() => {
    mockedNavigate.mockReset()
  })

  // Mock fetch
  beforeEach(() => {
    global.fetch = vi.fn()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renderiza y carga cursos iniciales', async () => {
    const cursosMock = [
      {
        id: 1,
        nombre: 'Curso 1',
        descripcion: 'Desc 1',
        duracion: '2 semanas',
        requisitos: 'Requisito 1',
      },
      {
        id: 2,
        nombre: 'Curso 2',
        descripcion: 'Desc 2',
        duracion: '3 semanas',
        requisitos: 'Requisito 2',
      },
    ]

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ cursos: cursosMock }),
    })

    render(<MainPage />)

    // Espera a que se muestren los cursos
    await waitFor(() => {
      expect(screen.getByText('Curso 1')).toBeInTheDocument()
      expect(screen.getByText('Curso 2')).toBeInTheDocument()
    })

    // Botón "Cargar más" debe estar visible
    expect(screen.getByRole('button', { name: /cargar más/i })).toBeInTheDocument()
  })

  it('al hacer click en un curso navega a /curso con el estado correcto', async () => {
    const cursosMock = [
      {
        id: 1,
        nombre: 'Curso 1',
        descripcion: 'Desc 1',
        duracion: '2 semanas',
        requisitos: 'Requisito 1',
      },
    ]

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ cursos: cursosMock }),
    })

    render(<MainPage />)

    // Esperar que cargue el curso
    await waitFor(() => {
      expect(screen.getByText('Curso 1')).toBeInTheDocument()
    })

    // Hacer click en el curso
    fireEvent.click(screen.getByText('Curso 1'))

    // Comprobar que navigate fue llamado con el estado correcto
    expect(mockedNavigate).toHaveBeenCalledWith('/curso', {
      state: {
        nombre: 'Curso 1',
        descripcion: 'Desc 1',
        duracion: '2 semanas',
        requisitos: 'Requisito 1',
      },
    })
  })

  it('deshabilita el botón "Cargar más" y muestra texto "Cargando..." mientras carga', async () => {
    let resolveFetch
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve
    })

    fetch.mockReturnValue(fetchPromise)

    render(<MainPage />)

    // Botón debe estar deshabilitado y mostrar "Cargando..."
    const boton = screen.getByTestId('boton-cargar-mas'); 
    expect(boton).toBeDisabled()
    expect(boton).toHaveValue('Cargando...')

    // Resolver fetch para que termine la carga
    resolveFetch({
      json: () => Promise.resolve({ cursos: [] }),
    })

    // Esperar a que el botón vuelva a estar habilitado o cambie el texto
    await waitFor(() => {
      expect(screen.queryByText(/cargando.../i)).not.toBeInTheDocument()
    })
  })

  it('muestra "No hay más resultados" cuando ya no hay cursos', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ cursos: [] }),
    })

    render(<MainPage />)

    await waitFor(() => {
      expect(screen.getByText('No hay más resultados')).toBeInTheDocument()
    })
  })

  it('al hacer click en "Cargar más" carga la siguiente página', async () => {
    const cursosPagina1 = [
      { id: 1, nombre: 'Curso 1', descripcion: '', duracion: '', requisitos: '' },
    ]
    const cursosPagina2 = [
      { id: 2, nombre: 'Curso 2', descripcion: '', duracion: '', requisitos: '' },
    ]

    fetch
      .mockResolvedValueOnce({ json: () => Promise.resolve({ cursos: cursosPagina1 }) })
      .mockResolvedValueOnce({ json: () => Promise.resolve({ cursos: cursosPagina2 }) })

    render(<MainPage />)

    await waitFor(() => {
      expect(screen.getByText('Curso 1')).toBeInTheDocument()
    })

    const boton = screen.getByRole('button', { name: /cargar más/i })
    fireEvent.click(boton)

    await waitFor(() => {
      expect(screen.getByText('Curso 2')).toBeInTheDocument()
    })
  })
})
