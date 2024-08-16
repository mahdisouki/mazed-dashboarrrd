import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useTranslation } from "react-i18next";

function AdsList() {
  const { t } = useTranslation();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [editType, setEditType] = useState('');
  const [uploadInputs, setUploadInputs] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      text: t("Une fois supprimé(e), vous ne pourrez pas récupérer cet élément !"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, supprimez-le !"),
      cancelButtonText: t("Non, annuler !"),
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
        Swal.fire(t("Supprimé(e) !"), t("Votre élément a été supprimé."), "success");
      } else {
        Swal.fire(t("Annulé"), t("Votre élément est en sécurité :)"), "error");
      }
    });
  };

  const deleteItem = () => {
    // Your delete logic here
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditType('');
    setUploadInputs([]);
  };

  const handleEditTypeChange = (event) => {
    const selectedType = event.target.value;
    setEditType(selectedType);
    setUploadInputs([]);
  };

  const handleAddUploadInput = () => {
    setUploadInputs([...uploadInputs, uploadInputs.length + 1]);
  };

  const handleRemoveUploadInput = (index) => {
    const updatedInputs = uploadInputs.filter((_, i) => i !== index);
    setUploadInputs(updatedInputs);
  };

  const handleEditSave = () => {
    // Handle save edit logic
    closeEditModal();
  };

  const handleFileInput = () => {
    if (editType === "image" || editType === "video") {
      return (
        <input
          type="file"
          className="form-control mb-3"
          accept={editType === "video" ? "video/*" : "image/*"}
        />
      );
    } else if (editType === "carousel") {
      return (
        <input type="file" className="form-control mb-3" multiple accept="image/*" />
      );
    }
    return null;
  };

  return (
    <div className="content-container">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h2 className="new-price">{t("Liste des annonces")}</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {isMobile ? (
                <table className="table" id="table1">
                  <tbody>
                    {/* Replace with your dynamic content */}
                    <tr>
                      <td>Example Data</td>
                      <td>
                        <Button variant="primary" onClick={openEditModal}>{t("Modifier")}</Button>{' '}
                        <Button variant="danger" onClick={handleDelete}>{t("Supprimer")}</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table" id="table1">
                  <thead>
                    <tr>
                      <th>{t("Titre")}</th>
                      <th>{t("Actions")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Replace with your dynamic content */}
                    <tr>
                      <td>Example Data</td>
                      <td>
                        <Button variant="primary" onClick={openEditModal}>{t("Modifier")}</Button>{' '}
                        <Button variant="danger" onClick={handleDelete}>{t("Supprimer")}</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={closeEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("Modification d’une annonce")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="edit-type">{t("Type de l'annonce")}</label>
              <select
                className="form-control"
                id="edit-type"
                onChange={handleEditTypeChange}
                value={editType}
              >
                <option value="">{t("Sélectionner le type d'annonce")}</option>
                <option value="image">{t("Image")}</option>
                <option value="video">{t("Vidéo")}</option>
                <option value="carousel">{t("Carousel")}</option>
              </select>
            </div>
            {editType && (
              <div className="form-group mb-3">
                <label>{t("Ajouter un fichier")}</label>
                <Button variant="secondary" onClick={handleAddUploadInput}>{t("Ajouter")}</Button>
                {uploadInputs.map((_, index) => (
                  <div key={index} className="mt-2">
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" />
                      <label className="custom-file-label" htmlFor="customFile">
                        {t("Choisir un fichier")}
                      </label>
                      <Button
                        variant="link"
                        className="ml-2"
                        onClick={() => handleRemoveUploadInput(index)}
                      >
                        {t("Supprimer")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEditModal}>{t("Annuler")}</Button>
            <Button variant="primary" onClick={handleEditSave}>{t("Enregistrer")}</Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
}

export default AdsList;
