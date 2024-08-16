import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function AnnonceCreator() {
  const { t } = useTranslation();
  const [showSuivantModal, setShowSuivantModal] = useState(false);
  const [showPlanifierModal, setShowPlanifierModal] = useState(false);
  const [fileInputType, setFileInputType] = useState("");

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setFileInputType(selectedType);
  };

  const handleFileInput = () => {
    if (fileInputType === "image" || fileInputType === "video") {
      return (
        <input
          type="file"
          className="form-control mb-3" // Add bottom margin for spacing between inputs
          accept={fileInputType === "video" ? "video/*" : "image/*"}
        />
      );
    } else if (fileInputType === "carousel") {
      return (
        <input type="file" className="form-control mb-3" multiple accept="image/*" />
      );
    }
    return null;
  };

  return (
    <div className="content-container">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2 className="new-price">{t("Création d'annonce")}</h2>
          </div>
          <div className="card-content">
            <div className="card-body">
              <form className="form form-vertical">
                <div className="form-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mb-3">
                        <label htmlFor="type-annonce">{t("Type de l'annonce")}</label>
                        <div className="position-relative">
                          <select
                            className="form-control"
                            id="type-annonce"
                            onChange={handleTypeChange}
                          >
                            <option value="">{t("Sélectionner le type d'annonce")}</option>
                            <option value="image">{t("Image")}</option>
                            <option value="video">{t("Vidéo")}</option>
                            <option value="carousel">{t("Carousel")}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3" id="file-input-container">
                      {handleFileInput()}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={() => setShowSuivantModal(false)}
                  >
                    {t("Annuler")}
                  </Button>
                  <Button
                    variant="primary"
                    className="ms-2"
                    onClick={() => setShowSuivantModal(true)}
                  >
                    {t("Suivant")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal
          show={showSuivantModal}
          onHide={() => setShowSuivantModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Actions")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button variant="primary" className="mb-1 me-2">{t("Annuler")}</Button>
            <Button
              variant="warning"
              className="mb-1 me-2"
              onClick={() => {
                setShowSuivantModal(false);
                setShowPlanifierModal(true);
              }}
            >
              {t("Planifier")}
            </Button>
            <Button variant="info" className="mb-1">{t("Publier immédiatement")}</Button>
          </Modal.Body>
        </Modal>
        <Modal
          show={showPlanifierModal}
          onHide={() => setShowPlanifierModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t("Planifier la publication")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="publicationDate">{t("Date")}</label>
              <input type="date" id="publicationDate" className="form-control" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="publicationTime">{t("Heure")}</label>
              <input type="time" id="publicationTime" className="form-control" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowPlanifierModal(false)}>{t("Annuler")}</Button>
            <Button variant="secondary">{t("Planifier")}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AnnonceCreator;
