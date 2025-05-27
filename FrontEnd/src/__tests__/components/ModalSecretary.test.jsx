import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ModalSecretary from '../../components/ModalSecretary';  // Ajusta la ruta

describe('ModalSecretary', () => {
  const defaultProps = {
    id: 'modalTest',
    title: 'Título de prueba',
    description: 'Descripción de prueba',
    show: true,
    handleClose: vi.fn(),
    handleConfirm: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('no renderiza el modal cuando show es false', () => {
    render(<ModalSecretary {...defaultProps} show={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renderiza el modal con título y descripción cuando show es true', () => {
    render(<ModalSecretary {...defaultProps} />);
    expect(screen.getByRole('dialog', { hidden: true })).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('botón "Close" llama a handleClose', () => {
    render(<ModalSecretary {...defaultProps} />);
    const closeButton = screen.getByLabelText(/close/i);
    fireEvent.click(closeButton);
    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  it('botón "No" llama a handleClose', () => {
    render(<ModalSecretary {...defaultProps} />);
   const noButton = screen.getByText(/no/i);
    fireEvent.click(noButton);
    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });

  it('botón "Si" llama a handleConfirm y luego a handleClose', () => {
    render(<ModalSecretary {...defaultProps} />);
    const yesButton = screen.getByText(/si/i);
    fireEvent.click(yesButton);
    expect(defaultProps.handleConfirm).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleClose).toHaveBeenCalledTimes(1);
  });
});
