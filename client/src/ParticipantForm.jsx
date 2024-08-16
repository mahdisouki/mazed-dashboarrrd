import React from "react";

function ParticipantForm() {
  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="new-price">Ajouter un Participant</h2>
            </div>
            <div className="card-content">
              <div className="card-body">
                <form className="form form-vertical">
                  <div className="form-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="email-id-icon">Nom</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="email-id-icon"
                              placeholder="Nom"
                              maxLength={25}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="email-id-icon">Prénom</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="email-id-icon"
                              placeholder="Prénom"
                              maxLength={25}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="email-id-icon">Pseudo</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="email-id-icon"
                              placeholder="Pseudo"
                              maxLength={25}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="email-id-icon">Email</label>
                          <div className="position-relative">
                            <input
                              type="Email"
                              className="form-control"
                              id="email-id-icon"
                              placeholder="email"
                              maxLength={25}
                            />
                          </div>
                        </div>
                      </div>
                      <label>Numéro de téléphone</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          +216
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                      <div className="modal-footer">
                        {/* Cancel Button */}
                        <button
                          type="button"
                          className="btn btn-light-secondary me-2"
                          data-bs-dismiss="modal"
                        >
                          <i className="bx bx-x d-block d-sm-none" />
                          <span className="d-none d-sm-block">Annuler</span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-dark"
                          id="suivantBtn"
                        >
                          Enregister
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipantForm;
