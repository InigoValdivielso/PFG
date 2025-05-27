import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalCredential from '../../components/ModalCredential';

describe('ModalCredential', () => {
    const defaultProps = {
        title: 'Título de prueba',
        description: ' - esta es la descripción',
        id: 'modalTest',
    };

    it('renderiza el botón con aria-label y atributos para abrir modal', () => {
        render(<ModalCredential {...defaultProps} />);
        const button = screen.getByRole('button', { name: /mostrar ayuda/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('accordion-button');
        expect(button).toHaveAttribute('data-bs-toggle', 'modal');
        expect(button).toHaveAttribute('data-bs-target', '#modalTest');
    });

    it('modal está en el DOM pero oculto inicialmente', () => {
        render(<ModalCredential {...defaultProps} />);
        const modal = screen.getByTestId(defaultProps.id);
        expect(modal).toBeInTheDocument();
        expect(modal).not.toHaveClass('show');
    });

    it('abre el modal y muestra título y descripción', async () => {
        render(<ModalCredential {...defaultProps} />);
        const openButton = screen.getByRole('button', { name: /mostrar ayuda/i });
        await userEvent.click(openButton);

        const modal = screen.getByTestId(defaultProps.id);
        modal.classList.add('show');

        expect(modal).toHaveClass('show');
        expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
        expect(screen.getByText(/esta es la descripción/i)).toBeInTheDocument();

    });

    it('botón cerrar está presente y cierra modal', async () => {
        render(<ModalCredential {...defaultProps} />);
        const openButton = screen.getByRole('button', { name: /mostrar ayuda/i });
        await userEvent.click(openButton);

        const modal = screen.getByTestId(defaultProps.id);
        modal.classList.add('show');

        const closeButton = screen.getByTestId('close-button-footer'); 
        expect(closeButton).toBeInTheDocument();

        await userEvent.click(closeButton);
        modal.classList.remove('show');
        expect(modal).not.toHaveClass('show');
    });
});
