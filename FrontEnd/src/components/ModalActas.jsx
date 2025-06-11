function ModalActas({ id, title, description, show, handleClose, handleConfirm }) {
    if (!show) {
        return null;
    }

    const handleConfirmAndClose = () => {
        handleConfirm();  // Llama a la función que elimina el item
        handleClose();    // Cierra el modal después de confirmar
    };

    return (
        <>
            <div className="modal show" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            {description}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleConfirmAndClose}>Si</button>
                            <button type="button" className="btn btn-danger" onClick={handleClose}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalActas;
