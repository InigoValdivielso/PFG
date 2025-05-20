import React from 'react';

function CredentialTable({ names }) {
    const separarPalabras = (texto) => {
        if (!texto) {
            return '';
        }

        if (texto.endsWith('ID')) {
            const parte1 = texto.slice(0, -2); // "Educational"
            const parte2 = texto.slice(-2);  // "ID"
            return texto.replace(parte2, ' ' + parte2).replace(/([A-Z])(?=[a-z])/g, ' $1').trim();
        } else {
            return texto.replace(/([A-Z])/g, ' $1').trim();
        }
    };
    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Credencial</th>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>Verificada</th>
                    </tr>
                </thead>
                <tbody>
                    {names && names.length > 0 ? (
                        names.map((name, index) => (
                            <tr key={index}>
                                <td scope="row" style={{ border: "none", background: "#EBEBEB", fontWeight: 'normal' }}>{separarPalabras(name)}</td>
                                <td scope="row" style={{ border: "none", background: "#EBEBEB", paddingLeft: "4%" }}>Si</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="2">No hay credenciales proporcionadas.</td></tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default CredentialTable;