import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import { useEffect } from 'react';

function Accordion({ curso }) {

    const [items, setItems] = useState([]);

    // Función para eliminar un ítem
    //const handleDelete = (id) => {
    //    setItems(prevItems => prevItems.filter(item => item.id !== id));
    //};

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const peticionIdCurso = await fetch(`http://localhost:8000/curso/${encodeURIComponent(curso)}`);
                const idCursoData = await peticionIdCurso.json();
                const idCurso = idCursoData.id;
                console.log(idCursoData.id);

                const response = await fetch(`http://localhost:8000/solicitudes_por_curso?id_curso=${encodeURIComponent(idCurso)}`);
                const solicitudes = await response.json();

                console.log(solicitudes);

            } catch (error) {
                console.error('Error al obtener solicitudes:', error);
            }
        };

        if (curso) {
            fetchSolicitudes();
        }
    }, [curso]);


    // Función para cambiar el estado a 'accepted'
    const handleAccept = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, status: 'accepted' } : item
            )
        );
    };

    // Función para cambiar el estado a 'rejected'
    const handleReject = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, status: 'rejected' } : item
            )
        );
    };

    // Filtrar ítems por estado
    const pendingItems = items.filter(item => item.status === 'pending');
    const acceptedItems = items.filter(item => item.status === 'accepted');
    const rejectedItems = items.filter(item => item.status === 'rejected');


    return (
        <>
            <h3
                className="titulo"
                style={{
                    textAlign: "left",
                    paddingBottom: "1%",
                    paddingLeft: "1%",
                    fontWeight: "800",
                    color: "#0153CE",
                }}
            >
                Solicitantes
            </h3>
            <div className="accordion" id="accordionExample">
                {pendingItems.length > 0 ? (
                    pendingItems.map(item => (
                        <AccordionItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            email={item.email}
                            status={item.status}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))
                ) : (
                    <p>No hay solicitudes</p>
                )}
            </div>
            <h3
                className="titulo"
                style={{
                    textAlign: "left",
                    paddingBottom: "1%",
                    paddingLeft: "1%",
                    paddingTop: "2%",
                    fontWeight: "800",
                    color: "#6cd574",
                }}
            >
                Solicitudes aceptadas
            </h3>
            <div className="accordion" id="acceptedAccordion">
                {acceptedItems.length > 0 ? (
                    acceptedItems.map(item => (
                        <AccordionItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            email={item.email}
                            status={item.status}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))
                ) : (
                    <p>No hay solicitudes aceptadas</p>
                )}
            </div>
            <h3
                className="titulo"
                style={{
                    textAlign: "left",
                    paddingBottom: "1%",
                    paddingLeft: "1%",
                    paddingTop: "2%",
                    fontWeight: "800",
                    color: "#da3737",
                }}
            >
                Solicitudes rechazadas
            </h3>
            <div className="accordion" id="rejectedAccordion">
                {rejectedItems.length > 0 ? (
                    rejectedItems.map(item => (
                        <AccordionItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            email={item.email}
                            status={item.status}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))
                ) : (
                    <p> No hay solicitudes rechazadas</p>
                )}
            </div>

        </>
    );
}

export default Accordion;
