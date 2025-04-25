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


                const response = await fetch(`http://localhost:8000/solicitudes_por_curso?id_curso=${encodeURIComponent(idCurso)}`);
                const solicitudes = await response.json();

                const solicitudesConDatos = await Promise.all(solicitudes.map(async (s) => {
                    const responsePersona = await fetch(`http://localhost:8000/persona/${s.id_persona}`);
                    const persona = await responsePersona.json();
                    

                    return {
                        id: s.id,
                        nombre: persona.nombre,
                        primer_apellido: persona.primer_apellido,
                        correo: persona.correo,
                        curso: curso,
                        estado: s.estado,
                        credenciales: s.credenciales
                    };
                }));

                setItems(solicitudesConDatos);


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
                item.id === id ? { ...item, estado: 'aceptada' } : item
            )
        );
    };

    // Función para cambiar el estado a 'rejected'
    const handleReject = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, estado: 'rechazada' } : item
            )
        );
    };

    // Filtrar ítems por estado
    const pendingItems = items.filter(item => item.estado === 'pendiente');
    const acceptedItems = items.filter(item => item.estado === 'aceptada');
    const rejectedItems = items.filter(item => item.estado === 'rechazada');


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
                            nombre={item.nombre}
                            primer_apellido={item.primer_apellido}
                            correo={item.correo}
                            curso={item.curso}
                            estado={item.estado}
                            credenciales={item.credenciales}
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
                            nombre={item.nombre}
                            primer_apellido={item.primer_apellido}
                            correo={item.correo}
                            curso={item.curso}
                            estado={item.estado}
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
                            nombre={item.nombre}
                            primer_apellido={item.primer_apellido}
                            correo={item.correo}
                            curso={item.curso}
                            estado={item.estado}
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
