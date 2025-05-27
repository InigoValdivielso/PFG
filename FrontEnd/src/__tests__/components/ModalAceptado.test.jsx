import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { vi } from 'vitest';
import ModalAceptado from '../../components/ModalAceptado';

describe('ModalAceptado', () => {
  afterEach(() => {
    cleanup();
    document.body.classList.remove('modal-open');
  });

  it('no muestra nada si isOpen es false', () => {
    render(<ModalAceptado isOpen={false} onClose={() => {}} mensaje="Hola mundo" />);
    expect(screen.queryByText(/¡Éxito!/)).not.toBeInTheDocument();
  });

  it('muestra el mensaje correctamente cuando isOpen es true', () => {
    render(<ModalAceptado isOpen={true} onClose={() => {}} mensaje="Proceso completado" />);
    expect(screen.getByText('¡Éxito!')).toBeInTheDocument();
    expect(screen.getByText('Proceso completado')).toBeInTheDocument();
  });

  it('llama a onClose al hacer clic en el botón aceptar', () => {
    const onCloseMock = vi.fn();  // 👈 Vitest usa vi.fn()
    render(<ModalAceptado isOpen={true} onClose={onCloseMock} mensaje="Otro mensaje" />);

    const acceptButton = screen.getByText('Aceptar');
    fireEvent.click(acceptButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('llama a onClose al hacer clic en la X (botón cerrar)', () => {
    const onCloseMock = vi.fn();
    render(<ModalAceptado isOpen={true} onClose={onCloseMock} mensaje="Mensaje X" />);

    const closeButton = screen.getByLabelText('Cerrar');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
