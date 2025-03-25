import React, { useState } from 'react';

function CredentialTable({ name }) {


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
                    <tr>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>{name}</th>
                        <th scope="col" style={{ border: "none", background: "#EBEBEB" }}>si</th>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default CredentialTable;
