import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

function AccordionList() {
    const [items, setItems] = useState([
        { id: 'item1', name: 'John Doe', email: 'john@example.com' },
        { id: 'item2', name: 'Jane Smith', email: 'jane@example.com' },
        // Agrega más ítems si es necesario
    ]);

    const handleDelete = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <>
            <div id="accordionExample">
                {items.map(item => (
                    <AccordionItem
                        id={item.id}
                        name={item.name}
                        email={item.email}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </>
    );
}

export default AccordionList;
