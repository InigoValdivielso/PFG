import React, { useEffect } from "react";

function ModalAceptado({ isOpen, onClose, mensaje }) {
    
    useEffect(() => {
        if (isOpen) {
          document.body.classList.add('modal-open');
        } else {
          document.body.classList.remove('modal-open');
        }
    
        return () => {
          document.body.classList.remove('modal-open');
        };
      }, [isOpen]);
    
      if (!isOpen) {
        return null;
      }
    
      return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" aria-labelledby="modalExitoLabel" aria-modal="true" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalExitoLabel">¡Éxito!</h5>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <p>{mensaje}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => { onClose(); }}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default ModalAceptado;