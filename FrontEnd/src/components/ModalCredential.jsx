function ModalCredential({title, description, id}) {
  const toggleId = `#${id}`;

  return (
      <>
          <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          />
          <button className="accordion-button material-symbols-outlined" data-bs-toggle="modal" data-bs-target={toggleId}>
            question_mark
          </button>

          <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <p>Debes de compartir tus microcredenciales: EducationalID {description}</p>
                      </div>
                      <div className="modal-footer">
                          <button className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
}

export default ModalCredential;