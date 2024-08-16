import React from "react";

function OffreEnchere() {
  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <section className="section">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Liste des Offres</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive datatable-minimal">
                <table className="table" id="table2">
                  <thead>
                    <tr>
                      <th>Type de Offre</th>
                      <th>Date de Création</th>
                      <th>Date et heure de lancement</th>
                      <th>l'enchere en question</th>
                      <th>l'le Produit en question</th>
                      <th>Supprimer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Thamer</td>
                      <td>Seif</td>
                      <td>Clubisty</td>
                      <td> (+1) 613 820 8838</td>
                      <td>04/07/2026 </td>
                      <td>
                        <div className="modal-danger me-1 mb-1 d-inline-block">
                          {/* Button trigger for danger theme modal */}
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#danger"
                          >
                            Supprimer
                          </button>
                          {/*Danger theme Modal */}
                          <div
                            className="modal fade text-left"
                            id="danger"
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="myModalLabel120"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header bg-danger">
                                  <h5
                                    className="modal-title white"
                                    id="myModalLabel120"
                                  ></h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <i data-feather="x" />
                                  </button>
                                </div>
                                <div className="modal-body">
                                  Vous Avez Sur de Supprimer !
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-light-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="bx bx-x d-block d-sm-none" />
                                    <span className="d-none d-sm-block">
                                      Close
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger ms-1"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="bx bx-check d-block d-sm-none" />
                                    <span className="d-none d-sm-block">
                                      Accept
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Thamer</td>
                      <td>Seif</td>
                      <td>Clubisty</td>
                      <td> (+1) 613 820 8838</td>
                      <td>04/07/2026 </td>
                      <td>
                        <div className="modal-danger me-1 mb-1 d-inline-block">
                          {/* Button trigger for danger theme modal */}
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#danger"
                          >
                            Supprimer
                          </button>
                          {/*Danger theme Modal */}
                          <div
                            className="modal fade text-left"
                            id="danger"
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="myModalLabel120"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header bg-danger">
                                  <h5
                                    className="modal-title white"
                                    id="myModalLabel120"
                                  ></h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <i data-feather="x" />
                                  </button>
                                </div>
                                <div className="modal-body">
                                  Vous Avez Sur de Supprimer !
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-light-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="bx bx-x d-block d-sm-none" />
                                    <span className="d-none d-sm-block">
                                      Close
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger ms-1"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="bx bx-check d-block d-sm-none" />
                                    <span className="d-none d-sm-block">
                                      Accept
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Thamer</td>
                      <td>Seif</td>
                      <td>Clubisty</td>
                      <td> (+1) 613 820 8838</td>
                      <td>04/07/2026 </td>
                      <td>
                        <div className="modal-danger me-1 mb-1 d-inline-block">
                          {/* Button trigger for danger theme modal */}
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#danger"
                          >
                            Supprimer
                          </button>
                          {/*Danger theme Modal */}
                          <div
                            className="modal fade text-left"
                            id="danger"
                            tabIndex={-1}
                            role="dialog"
                            aria-labelledby="myModalLabel120"
                            aria-hidden="true"
                          >
                            <div
                              className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                              role="document"
                            >
                              <div className="modal-content">
                                <div className="modal-header bg-danger">
                                  <h5
                                    className="modal-title white"
                                    id="myModalLabel120"
                                  ></h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <i data-feather="x" />
                                  </button>
                                </div>
                                <div className="modal-body">
                                  Vous Avez Sur de Supprimer !
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-light-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="bx bx-x d-block d-sm-none" />
                                    <span className="d-none d-sm-block">
                                      Close
                                    </span>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger ms-1"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="bx bx-check d-block d-sm-none" />
                                    <span className="d-none d-sm-block">
                                      Accept
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default OffreEnchere;
