import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

function Accordion() {
    // Estado para manejar los ítems del acordeón
    const [items, setItems] = useState([
        { id: "123456789A", name: "Pedro", email: "pedro@pendeusto.es", status: "pending" },
        { id: "123456789B", name: "Maria", email: "maria@pendeusto.es", status: "pending" },
        { id: "123456789C", name: "Juan", email: "juan@pendeusto.es", status: "pending" },
        { id: "123456789D", name: "Lucia", email: "lucia@pendeusto.es", status: "pending" },
    ]);

    // Función para eliminar un ítem
    //const handleDelete = (id) => {
    //    setItems(prevItems => prevItems.filter(item => item.id !== id));
    //};

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
                Pending requests
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
                        <p>No pending requests</p>
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
                Accepted requests
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
                        <p>No accepted requests</p>
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
                Rejected requests
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
                        <p>No rejected requests</p>
                    )}
            </div>

        </>
    );
}

export default Accordion;
