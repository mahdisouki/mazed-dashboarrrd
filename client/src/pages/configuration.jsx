import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "choices.js/public/assets/styles/choices.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";

function Configuration() {
  const { t } = useTranslation();
  const [showEmail1, setShowEmail1] = useState(true);
  const [showEmail2, setShowEmail2] = useState(true);
  const [showFac, setShowFac] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleCheckbox1Change = () => {
    setShowEmail1(!showEmail1);
  };

  const handleCheckbox2Change = () => {
    setShowEmail2(!showEmail2);
    setShowFac(!showFac);
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = () => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Une fois supprimé(e), vous ne pourrez pas récupérer cet élément !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Oui, Annuler-le !",
      cancelButtonText: "Non, annuler !",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Call deleteItem function
        deleteItem();
        Swal.fire({
          title: "Annuler(e) !",
          text: "Votre élément a été supprimé.",
          icon: "success",
          iconColor:"black",
          confirmButtonColor: "#b0210e", // Change to your desired color
          confirmButtonText: "OK"
        });      } else {
        Swal.fire({
          title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e", // Change to your desired color
          confirmButtonText: "OK"
        });      }
    });
  };
  const deleteItem = () => {
    // Implement your delete logic here
  };
  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="page-heading">
          <section id="basic-vertical-layouts">
            <div className="match-height">
              <div>
                <div className="card">
                  <div className="card-header">
                    <h2 className="new-price" id="myModalLabel33">
                      {t("Configuration De L'enchere")}
                    </h2>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form className="form form-vertical">
                        <div className="form-body">
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="participation-cost">
                                  {t("Cout Du Participation")}
                                </label>
                                <input
                                  type="number"
                                  id="participation-cost"
                                  className="form-control"
                                  name="participation-cost"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="click-cost">
                                  {t("Cout Du Clic")}
                                </label>
                                <input
                                  type="number"
                                  id="click-cost"
                                  className="form-control"
                                  name="click-cost"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="increment-value">
                                  {t("Valeur De Majoration")}
                                </label>
                                <input
                                  type="number"
                                  id="increment-value"
                                  className="form-control"
                                  name="increment-value"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12 checkbox">
                              <input
                                type="checkbox"
                                id="checkbox1"
                                className="col-1 form-check-input"
                                checked={showEmail1}
                                onChange={handleCheckbox1Change}
                              />
                              <span>Remboursement</span>
                            </div>
                            {showEmail1 && (
                              <div className="col-12">
                                <input
                                  type="text"
                                  id="email-id-vertical1"
                                  className="col-6 form-control"
                                  name="email-id"
                                  placeholder="Ecrire Ici"
                                  required
                                />
                              </div>
                            )}
                            <br />
                            <br />
                            <div className="row">
                              <div className="col-12 checkbox">
                                <input
                                  type="checkbox"
                                  id="checkbox2"
                                  className="col-6 form-check-input"
                                  checked={showEmail2}
                                  onChange={handleCheckbox2Change}
                                />
                                <span>Facilité</span>
                              </div>
                              {showEmail2 && (
                                <div className="col-6">
                                  <input
                                    type="number"
                                    id="email-id-vertical2"
                                    className="col-6 form-control"
                                    name="email-id"
                                    placeholder="Ecrire Ici"
                                    required
                                  />
                                </div>
                              )}
                              {showFac && (
                                <fieldset
                                  style={{ padding: "0px", margin: "0px" }}
                                  id="fac"
                                  className="col-6 form-group"
                                >
                                  <select
                                    className="form-select"
                                    id="basicSelect"
                                    required
                                  >
                                    <option>Mois</option>
                                    <option>L'année</option>
                                  </select>
                                </fieldset>
                              )}
                            </div>

                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="number-of-months">
                                  {t("Nb De Mois")}
                                </label>
                                <input
                                  type="number"
                                  id="number-of-months"
                                  className="form-control"
                                  name="number-of-months"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <br/>
            <div className="card">
              <div
              style={{ backgroundColor: "white", padding: 20 }}
              className="modal-content"
            >
              <div className="modal-header">
                <h2 className="new-price" id="myModalLabel33">
                  {t("Ajouter une nouvelle Configuration")}
                </h2>
              </div>
              <form action="#">
                <div className="modal-body">
                  <label htmlFor="expected-participants">
                    {t("Nb attendu des participants")}
                  </label>
                  <div className="form-group">
                    <input
                      type="number"
                      id="expected-participants"
                      className="form-control"
                      placeholder={t("Écrivez ici")}
                      maxLength={25}
                      required
                    />
                  </div>
                  <label htmlFor="launch-date">{t("Date de Lancement")}</label>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      id="launch-date"
                      className="form-control"
                      placeholder={t("Écrivez ici")}
                      required
                    />
                  </div>
                  <label htmlFor="closing-date">{t("Date de Fermeture")}</label>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      id="closing-date"
                      className="form-control"
                      placeholder={t("Écrivez ici")}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary ms-1"
                    onClick={handleOpenModal}
                  >
                    <span className="d-none d-sm-block">{t("Planifier")}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary ms-1"
                  >
                    <span className="d-none d-sm-block">{t("Publier")}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary ms-1"
                  >
                    <span className="d-none d-sm-block">{t("Enregister")}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary ms-1"
                    onClick={handleDelete}
                  >
                    <span className="d-none d-sm-block">{t("Annuler")}</span>
                  </button>
                </div>
              </form>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("Planifier")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label">{t("Date")}</label>
            <input type="date" className="form-control" id="dateInput" />
          </div>
          <div className="mb-3">
            <label htmlFor="timeInput" className="form-label">{t("Heure")}</label>
            <input type="time" className="form-control" id="timeInput" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {t("Fermer")}
          </Button>
          <Button variant="primary">
            {t("Planifier")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Configuration;
