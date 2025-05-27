import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AccordionItem from '../../components/AccordionItem';

vi.mock('../../components/AccordionTable', () => ({
  default: () => <div data-testid="accordion-table" />,
}));

vi.mock('../../components/CredentialTable', () => ({
  default: ({ names }) => (
    <div data-testid="credential-table">{names.join(', ')}</div>
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

describe('AccordionItem', () => {
  const credencialesMock = [
    'cred1',
    'cred2',
  ];

  const fetchedCredencialsResponse = {
    _id: 'cred1-id',
    presentationDefinition: {
      input_descriptors: [{ id: 'cred1-name' }, { id: 'cred1-name-2' }],
    },
    policyResults: {
      results: [
        {},
        {
          policyResults: [
            { result: { vc: { credentialSubject: { id: 'did:example:123' } } } },
          ],
        },
      ],
    },
  };

  const fetchedCredencialsResponse2 = {
    _id: 'cred2-id',
    presentationDefinition: {
      input_descriptors: [{ id: 'cred2-name' }],
    },
    policyResults: {
      results: [
        {},
        {
          policyResults: [
            { result: { vc: { credentialSubject: { id: 'did:example:456' } } } },
          ],
        },
      ],
    },
  };

  beforeEach(() => {
    global.fetch = vi.fn((url) => {
      if (url.includes('credenciales/cred1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(fetchedCredencialsResponse),
        });
      }
      if (url.includes('credenciales/cred2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(fetchedCredencialsResponse2),
        });
      }
      if (url.includes('solicitud')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      if (url.includes('estudiante')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      return Promise.reject(new Error('Unknown URL'));
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const baseProps = {
    nombre: 'Juan',
    primer_apellido: 'Perez',
    segundo_apellido: 'Lopez',
    correo: 'jperez@opendeusto.es',
    fechaNacimiento: '2000-01-01',
    id: '123',
    dni: '12345678A',
    curso: 'Matemáticas',
    curso_id: 'mat101',
    estado: 'pendiente',
    credenciales: credencialesMock,
    onAccept: vi.fn(),
    onReject: vi.fn(),
  };

  it('renderiza correctamente con datos y carga credenciales', async () => {
    render(<AccordionItem {...baseProps} />);

    // Se renderiza texto básico
    expect(screen.getByText(/Juan Perez/)).toBeInTheDocument();
    expect(screen.getByText(/jperez@opendeusto.es/)).toBeInTheDocument();

    // AccordionTable debe estar renderizado
    expect(screen.getByTestId('accordion-table')).toBeInTheDocument();

    // Espera a que se carguen las credenciales (useEffect)
    await waitFor(() => {
      expect(screen.getByTestId('credential-table')).toBeInTheDocument();
    });

    // Comprueba que se muestran los nombres de las credenciales mockeadas
    expect(screen.getByTestId('credential-table')).toHaveTextContent('cred1-name, cred1-name-2');
  });

  it('abre modal de aceptar y confirma llamada', async () => {
    render(<AccordionItem {...baseProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Aceptar/i }));

    // Modal abierto
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('¿Estas seguro de que quieres aceptar esta solicitud?')).toBeInTheDocument();

    // Confirmar acepta
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(baseProps.onAccept).toHaveBeenCalledWith(baseProps.id);
    });

    // Modal cerrado tras confirmar
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('abre modal de rechazar y confirma llamada', async () => {
    render(<AccordionItem {...baseProps} />);

    fireEvent.click(screen.getByRole('button', { name: /Rechazar/i }));

    // Modal abierto
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('¿Estas seguro de que quieres rechazar esta solicitud?')).toBeInTheDocument();

    // Confirmar rechaza
    fireEvent.click(screen.getByText('Confirmar'));

    await waitFor(() => {
      expect(baseProps.onReject).toHaveBeenCalledWith(baseProps.id);
    });

    // Modal cerrado tras confirmar
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
