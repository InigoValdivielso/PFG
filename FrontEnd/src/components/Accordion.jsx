import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import { useEffect } from 'react';

function Accordion({ curso }) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const peticionIdCurso = await fetch(`http://localhost:5000/sql/curso/nombre/${encodeURIComponent(curso)}`);
                const idCursoData = await peticionIdCurso.json();
                const idCurso = idCursoData.id;


                const response = await fetch(`http://localhost:5000/sql/solicitudes_por_curso?id_curso=${encodeURIComponent(idCurso)}`);
                const solicitudes = await response.json();

                const solicitudesConDatos = await Promise.all(solicitudes.map(async (s) => {
                    const responsePersona = await fetch(`http://localhost:5000/sql/persona/${s.id_persona}`);
                    const persona = await responsePersona.json();
                    

                    return {
                        id: s.id,
                        nombre: persona.nombre,
                        primer_apellido: persona.primer_apellido,
                        segundo_apellido: persona.segundo_apellido,
                        dni: persona.dni,
                        correo: persona.correo,
                        fechaNacimiento: persona.fecha_nacimiento,
                        curso: curso,
                        curso_id: idCurso,
                        estado: s.estado,
                        credenciales: s.credenciales
                    };
                }));

                setItems(solicitudesConDatos);


            } catch (error) {
                console.error('Error al obtener solicitudes:', error);
                alert('Error al cargar las solicitudes. Por favor, inténtalo de nuevo más tarde.');
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
                id="headingSolicitantes"
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
            <div className="accordion" id="accordionExample" role="region" aria-labelledby="headingSolicitantes">
                {pendingItems.length > 0 ? (
                    pendingItems.map(item => (
                        <AccordionItem
                            key={item.id}
                            id={item.id}
                            nombre={item.nombre}
                            primer_apellido={item.primer_apellido}
                            segundo_apellido={item.segundo_apellido}
                            dni={item.dni}
                            correo={item.correo}
                            fechaNacimiento={item.fechaNacimiento}
                            curso={item.curso}
                            curso_id={item.curso_id}
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
                id="headingAceptadas"
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
            <div className="accordion" id="acceptedAccordion" role="region"  aria-labelledby="headingAceptadas">
                {acceptedItems.length > 0 ? (
                    acceptedItems.map(item => (
                        <AccordionItem
                            key={item.id}
                            id={item.id}
                            nombre={item.nombre}
                            primer_apellido={item.primer_apellido}
                            segundo_apellido={item.segundo_apellido}
                            dni={item.dni}
                            correo={item.correo}
                            fechaNacimiento={item.fechaNacimiento}
                            curso={item.curso}
                            curso_id={item.curso_id}
                            estado={item.estado}
                            credenciales={item.credenciales}
                            onAccept={handleAccept}
                            onReject={handleReject}
                        />
                    ))
                ) : (
                    <p>No hay solicitudes aceptadas</p>
                )}
            </div>
            <h3
                id="headingRechazadas"
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
            <div className="accordion" id="rejectedAccordion" role="region" aria-labelledby="headingRechazadas">
                {rejectedItems.length > 0 ? (
                    rejectedItems.map(item => (
                        <AccordionItem
                            key={item.id}
                            id={item.id}
                            nombre={item.nombre}
                            primer_apellido={item.primer_apellido}
                            segundo_apellido={item.segundo_apellido}
                            dni={item.dni}
                            correo={item.correo}
                            fechaNacimiento={item.fechaNacimiento}
                            curso={item.curso}
                            curso_id={item.curso_id}
                            estado={item.estado}
                            credenciales={item.credenciales}
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
