import { render, screen } from '@testing-library/react';
import CredentialTable from '../../components/CredentialTable'; 

describe('CredentialTable', () => {
  it('muestra correctamente las credenciales formateadas', () => {
    const names = [
      'EducationalCredentialID',
      'ProfessionalCertificate',
      'AdvancedDegreeID',
    ];

    render(<CredentialTable names={names} />);

    // La función separarPalabras debería transformar los textos así:
    expect(screen.getByText('Educational Credential ID')).toBeInTheDocument();
    expect(screen.getByText('Professional Certificate')).toBeInTheDocument();
    expect(screen.getByText('Advanced Degree ID')).toBeInTheDocument();

    // Verificamos que en la columna "Verificada" aparece "Si" para cada fila
    const verifiedCells = screen.getAllByText('Si');
    expect(verifiedCells.length).toBe(3);
  });

  it('muestra mensaje cuando no hay credenciales', () => {
    render(<CredentialTable names={[]} />);

    expect(screen.getByText('No hay credenciales proporcionadas.')).toBeInTheDocument();
  });

  it('muestra mensaje cuando names es undefined', () => {
    render(<CredentialTable />);

    expect(screen.getByText('No hay credenciales proporcionadas.')).toBeInTheDocument();
  });
});
