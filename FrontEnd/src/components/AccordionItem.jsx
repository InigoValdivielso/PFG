import React, { useState } from 'react';
import AccordionTable from "./AccordionTable";
import CredentialTable from "./CredentialTable";
import ModalSecretary from './ModalSecretary';

function AccordionItem({ nombre, primer_apellido, correo, id, curso, estado, credenciales, onAccept, onReject  }) {
    const targetId = `#${id}`;
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const handleAccept = () => {
        setShowAcceptModal(true);
    };

    const handleReject = () => {
        setShowRejectModal(true);
    };

    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
    };

    const handleCloseRejectModal = () => {
        setShowRejectModal(false);
    };

    const confirmAccept = async () => {
        try {
            const response = await fetch(`http://localhost:8000/solicitud/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: 'aceptada' }),
            });

            if (response.ok) {
                setEstado('aceptada');
            } else {
                console.error('Error al aceptar la solicitud');
            }
        } catch (error) {
            console.error('Error de red al aceptar la solicitud:', error);
        }
        handleCloseAcceptModal();
        onAccept(id);
    };

    const confirmReject = async () => {
        try {
            const response = await fetch(`http://localhost:8000/solicitud/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: 'rechazada' }),
            });

            if (response.ok) {
                setEstado('rechazada');
            } else {
                console.error('Error al rechazar la solicitud');
            }
        } catch (error) {
            console.error('Error de red al rechazar la solicitud:', error);
        }
        onReject(id);
        handleCloseRejectModal();
    };

    return (
        <div className="accordion-item" style={{ background: "#EBEBEB" }}>
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={targetId} aria-expanded="false" aria-controls="collapseOne">
                    {nombre} - {correo} - {id}
                </button>
            </h2>
            <div id={id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <AccordionTable name={nombre} surname={primer_apellido} email={correo} program={curso} />
                    <br></br>
                    <h4>Credenciales proporcionadas:</h4>
                    <br></br>
                    
                    {credenciales && credenciales.length > 0 ? (
                        credenciales.map((credencial) => (
                            <CredentialTable name={credencial.name} /> // Aquí pasas la credencial al componente
                        ))
                    ) : (
                        <p>No hay credenciales proporcionadas.</p>
                    )}
                    
                    {estado === 'pendiente' && (
                        <div style={{ marginLeft: "40%" }}>
                            <button className="btn btn-primary" type="button" style={{ marginRight: "5%" }} onClick={handleAccept}>Aceptar</button>
                            <button className="btn btn-danger" type="button" onClick={handleReject}>Rechazar</button>
                        </div>
                    )}
                </div>
            </div>
            {/* Modal para Accept */}
            {showAcceptModal && (
                <ModalSecretary
                    title="Cuidado"
                    description="¿Estas seguro de que quieres aceptar esta solicitud?"
                    id="Accept"
                    show={showAcceptModal}
                    handleClose={handleCloseAcceptModal}
                    handleConfirm={confirmAccept}  // Llama a handleDelete al hacer clic en Yes
                />
            )}
            {/* Modal para Reject */}
            {showRejectModal && (
                <ModalSecretary
                    title="Cuidado"
                    description="¿Estas seguro de que quieres rechazar esta solicitud?"
                    id="Reject"
                    show={showRejectModal}
                    handleClose={handleCloseRejectModal}
                    handleConfirm={confirmReject}
                />
            )}
        </div>
    );
}

export default AccordionItem;
