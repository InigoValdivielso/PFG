import React, { useState } from 'react';
import AccordionTable from "./AccordionTable";
import CredentialTable from "./CredentialTable";
import ModalSecretary from './ModalSecretary';

function AccordionItem({ name, email, id, status, onAccept, onReject  }) {
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

    const confirmAccept = () => {
        onAccept(id);
        handleCloseAcceptModal();
    };

    const confirmReject = () => {
        onReject(id);
        handleCloseRejectModal();
    };

    return (
        <div className="accordion-item" style={{ background: "#EBEBEB" }}>
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={targetId} aria-expanded="false" aria-controls="collapseOne">
                    {name} - {email} - {id}
                </button>
            </h2>
            <div id={id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <AccordionTable name="test1" surname="surname1" email="test1@gmail.com" program="Computer Engineering" />
                    <br></br>
                    <h4>Credenciales proporcionadas:</h4>
                    <br></br>
                    
                    <CredentialTable name="EducantionalID" />
                    
                    {status === 'pending' && (
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
                    title="Caution"
                    description="Are you sure you want to accept this enrollment?"
                    id="Accept"
                    show={showAcceptModal}
                    handleClose={handleCloseAcceptModal}
                    handleConfirm={confirmAccept}  // Llama a handleDelete al hacer clic en Yes
                />
            )}
            {/* Modal para Reject */}
            {showRejectModal && (
                <ModalSecretary
                    title="Warning"
                    description="Are you sure you want to reject this enrollment?"
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
