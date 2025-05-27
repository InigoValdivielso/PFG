import { render, screen } from '@testing-library/react';
import AccordionTable from '../../components/AccordionTable';  

describe('AccordionTable', () => {
  it('muestra correctamente los datos en la tabla', () => {
    const props = {
      name: 'Juan',
      surname: 'Pérez',
      email: 'juan.perez@example.com',
      program: 'Ingeniería Informática',
    };

    render(<AccordionTable {...props} />);

    // Comprobamos que cada dato aparece en la tabla
    expect(screen.getByText('Juan')).toBeInTheDocument();
    expect(screen.getByText('Pérez')).toBeInTheDocument();
    expect(screen.getByText('juan.perez@example.com')).toBeInTheDocument();
    expect(screen.getByText('Ingeniería Informática')).toBeInTheDocument();

    // También se puede comprobar que las cabeceras estén presentes
    expect(screen.getByText('Nombre')).toBeInTheDocument();
    expect(screen.getByText('Apellido')).toBeInTheDocument();
    expect(screen.getByText('Correo')).toBeInTheDocument();
    expect(screen.getByText('Curso')).toBeInTheDocument();
  });
});
