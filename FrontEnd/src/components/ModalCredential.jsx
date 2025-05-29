import { MdHelpOutline } from 'react-icons/md';
function ModalCredential({title, description, id}) {
  const toggleId = `#${id}`;

  return (
      <>
          <button className="accordion-button" data-bs-toggle="modal" data-bs-target={toggleId} aria-label="Mostrar ayuda">
            <MdHelpOutline size={24} />
          </button>

          <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}-label`} aria-hidden="true" role="dialog" aria-modal="true" data-testid={id}>
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h1 className="modal-title fs-5" id={`${id}-label`}>{title}</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" data-testid="close-button"></button>
                      </div>
                      <div className="modal-body">
                        <p>Debes de compartir tus microcredenciales: EducationalID{description}</p>
                      </div>
                      <div className="modal-footer">
                          <button className="btn btn-secondary" role="button" data-bs-dismiss="modal" aria-label="Cerrar modal" data-testid="close-button-footer">Cerrar</button>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}

export default ModalCredential;