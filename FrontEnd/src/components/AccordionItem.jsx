import React, { useState, useEffect } from 'react';
import AccordionTable from "./AccordionTable";
import CredentialTable from "./CredentialTable";
import ModalSecretary from './ModalSecretary';

function AccordionItem({ nombre, primer_apellido, segundo_apellido, correo, id, dni, curso, curso_id, estado, credenciales, onAccept, onReject }) {
    const [credencialesData, setCredencialesData] = useState([]);
    const [estudiantedid, setEstudianteDid] = useState([]);
    const [estudianteIdCredenciales, setEstudianteIdCredenciales] = useState([]);
    const targetId = `#${id}`;
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [estudianteData, setEstudianteData] = useState({
        nombre: nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        correo: primer_apellido + '.' + nombre + '@opendeusto.es',
        dni: dni,
        did: estudiantedid,
        cursos: [curso_id],
        credenciales: [estudianteIdCredenciales]
    });

    useEffect(() => {
        const fetchCredentialDetails = async () => {
            try {

                const fetchedData = await Promise.all(
                    credenciales.map(async (credencial) => {

                        const response = await fetch(`http://localhost:4000/credenciales/${encodeURIComponent(credencial)}`);
                        const data = await response.json();
                        return {
                            id: data._id,
                            nombre_credencial: data.presentationDefinition.input_descriptors[0].id,
                            did: data.policyResults.results[1].policyResults[0].result.vc.credentialSubject.id
                        };
                    })
                );
                console.log(fetchedData);
                const nombresCredenciales = fetchedData.map(item => item.nombre_credencial);
                setCredencialesData(nombresCredenciales);

                if (fetchedData.length > 0) {
                    setEstudianteDid(fetchedData[0].did);
                    setEstudianteIdCredenciales(fetchedData[0].id);
                } else {
                    setEstudianteDid(undefined); 
                    setEstudianteIdCredenciales(undefined);
                }
                setEstudianteData(prevData => ({
                    ...prevData,
                    did: fetchedData[0].did,
                    credenciales: fetchedData.map(item => item.id)
                }));

            } catch (error) {
                console.error("Error al obtener los detalles de las credenciales:", error);
            }
        };

        if (credenciales && credenciales.length > 0) {
            fetchCredentialDetails();
        }
    }, [credenciales]);

    const crearEstudianteEnBackend = async () => {
        console.log('Crear estudiante en backend llamado');
        try {
            const response = await fetch('http://localhost:8000/estudiante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estudianteData),
            });
            console.log(estudianteData);

            if (response.ok) {
                const data = await response.json();
                console.log('Estudiante creado:', data);
            } else {
                const errorData = await response.json();
                console.error('Error al crear estudiante:', errorData);

            }
        } catch (error) {
            console.error('Error de red:', error);

        }
    };

    const handleAccept = () => {
        setShowAcceptModal(true);
    };

    const handleReject = () => {
        setShowRejectModal(true);
    };

    const handleCloseAcceptModal = () => {
        setShowAcceptModal(false);
        crearEstudianteEnBackend();
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
                //setEstado('aceptada');
            } else {
                console.error('Error al aceptar la solicitud');
            }
        } catch (error) {
            console.error('Error de red al aceptar la solicitud:', error);
        }
        onAccept(id);
        setShowAcceptModal(false);
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
                    {nombre} {primer_apellido} - {correo} - {id}
                </button>
            </h2>
            <div id={id} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <AccordionTable name={nombre} surname={primer_apellido} email={correo} program={curso} />
                    <br></br>
                    <h4>Credenciales proporcionadas:</h4>
                    <br></br>

                    {credencialesData.length > 0 ? (
                        credencialesData.map((credencial, index) => (
                            <CredentialTable key={index} name={credencial} />
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
                    handleConfirm={confirmAccept}  
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
