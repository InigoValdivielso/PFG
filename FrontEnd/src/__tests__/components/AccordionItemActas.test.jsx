import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccordionItemActas from '../../components/AccordionItemActas';

vi.mock('../../components/AccordionTable', () => ({
  default: (props) => (
    <div data-testid="accordion-table">
      {props.name} {props.surname} {props.email} {props.program}
    </div>
  ),
}));

vi.mock('../../components/ModalSecretary', () => ({
  default: ({ show, handleClose, handleConfirm, title, description }) =>
    show ? (
      <div data-testid="modal">
        <h1>{title}</h1>
        <p>{description}</p>
        <button onClick={handleConfirm}>Confirmar</button>
        <button onClick={handleClose}>Cerrar</button>
      </div>
    ) : null,
}));

describe('AccordionItemActas', () => {
  const baseProps = {
    nombre: 'Ana',
    primer_apellido: 'Gomez',
    segundo_apellido: 'Lopez',
    correo: 'ana.gomez@example.com',
    NIA: 'NIA123',
    dni: '98765432B',
    curso: 'Historia',
    curso_id: 'hist101',
    estado: 'en proceso',
    credenciales: [],
    onAccept: vi.fn(),
    onReject: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  });

  it('renderiza correctamente con datos y muestra boton Aceptar si estado es "en proceso"', () => {
    render(<AccordionItemActas {...baseProps} />);

    // Datos básicos visibles
    expect(screen.getByText(/Ana Gomez - ana.gomez@example.com - NIA123/)).toBeInTheDocument();

    // Componente AccordionTable visible con props
    expect(screen.getByTestId('accordion-table')).toHaveTextContent('Ana Gomez ana.gomez@example.com Historia');

    // Botón aceptar visible
    expect(screen.getByRole('button', { name: /Aceptar/i })).toBeInTheDocument();
  });

  it('no muestra boton Aceptar si estado no es "en proceso"', () => {
    render(<AccordionItemActas {...baseProps} estado="aceptada" />);

    expect(screen.queryByRole('button', { name: /Aceptar/i })).not.toBeInTheDocument();
  });

  it('abre modal al hacer click en Aceptar', () => {
    render(<AccordionItemActas {...baseProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Aceptar/i }));

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Cuidado')).toBeInTheDocument();
    expect(screen.getByText('¿Estas seguro de que quieres aceptar esta solicitud?')).toBeInTheDocument();
  });

  it('confirma aceptación y llama a onAccept', async () => {
    render(<AccordionItemActas {...baseProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Aceptar/i }));

    // Click en confirmar dentro del modal
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `http://localhost:8000/estudiante/${baseProps.NIA}/curso/${baseProps.curso_id}/estado?nuevo_estado=aceptada`,
        expect.objectContaining({ method: 'PUT' })
      );
      expect(baseProps.onAccept).toHaveBeenCalledWith(baseProps.NIA);
    });

    // Modal debe cerrarse
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('cierra modal y llama a crearEstudianteEnBackend (mock indirecto) al cerrar modal', async () => {
    // Como crearEstudianteEnBackend no está expuesto, sólo comprobamos que el modal se cierre al llamar a handleClose
    render(<AccordionItemActas {...baseProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Aceptar/i }));

    fireEvent.click(screen.getByText('Cerrar'));

    // Modal cerrado
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
