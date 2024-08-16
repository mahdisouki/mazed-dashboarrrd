import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DemandeCatAdmin = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [starClicked, setStarClicked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [label, setLabel] = useState("");
  const [image, setImage] = useState(null);
  const [initialStock, setInitialStock] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleValidation = (action) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui"),
      cancelButtonText: t("Non, annuler !"),
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (action === "valider") {
          Swal.fire({
            title: "Valider",
            text: "Votre élément est validé :)",
            icon: "success",
            confirmButtonColor: "#b0210e",
          });
        } else {
          Swal.fire({
            title: "Refuser",
            text: "Votre élément est refusé :)",
            icon: "error",
            confirmButtonColor: "#b0210e",
          });
        }
      } else {
        Swal.fire({
          title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      label,
      image,
      initialStock,
      currentStock,
      color,
      description,
    });
    setShowEditModal(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="content-container">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h2 className="new-price">{t("Demande Catégorie")}</h2>
          </div>
          <div className="card-body">
            {isMobile ? (
              <Table responsive="sm">
                <tbody>
                    <tr>
                    <td>{t("Photo de Profile")}</td>
                    <td>
                      <img style={{borderRadius:"50px"}} className="imgtable" src="./Mazed.jpg" alt="img" />
                    </td>
                    </tr>
                    <tr>
                    <td>{t("Nom")}</td>
                    <td>Lorem</td>
                    </tr>
                    <tr>
                        <td>{t("Prénom")}</td>
                        <td>Lorem</td>
                    </tr>
                  <tr>
                    <td>{t("Ancien catégorie")}</td>
                    <td>
                      <img className="imgtable" src="./Mazed.jpg" alt="img" />
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Nouveau catégorie")}</td>
                    <td>
                      <img className="imgtable" src="./Mazed.jpg" alt="img" />
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Statut")}</td>
                    <td>
                      <button className="btn btn-secondary">
                        {t("Publié")}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Valider")}</td>
                    <td>
                      <i
                        className="fa-solid fa-circle-check text-success"
                        onClick={() => handleValidation("valider")}
                      ></i>
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Refuser")}</td>
                    <td>
                      <i
                        className="fa-solid fa-circle-xmark text-danger"
                        onClick={() => handleValidation("refuser")}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <Table responsive="sm">
                <thead>
                  <tr>
                  <th>{t("Photo de Profile")}</th>
                  <th>{t("Nom")}</th>
                  <th>{t("Prénom")}</th>
                    <th>{t("Ancien catégorie")}</th>
                    <th>{t("Nouveau catégorie")}</th>
                    <th>{t("Statut")}</th>
                    <th>{t("Action")}</th>
                    <th>{t("Valider")}</th>
                    <th>{t("Refuser")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                  <td>
                      <img style={{borderRadius:"50px"}} className="imgtable" src="./Mazed.jpg" alt="img" />
                    </td>
                    <td>lorem</td>
                    <td>Lorem</td>
                    <td>
                      <img className="imgtable" src="./Mazed.jpg" alt="img" />
                    </td>
                    <td>
                      <img className="imgtable" src="./Mazed.jpg" alt="img" />
                    </td>
                    <td>
                      <button className="btn btn-secondary">
                        {t("Publié")}
                      </button>
                    </td>
                    <td>Action</td>
                    <td>
                      <i
                        className="fa-solid fa-circle-check text-success"
                        onClick={() => handleValidation("valider")}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-circle-xmark text-danger"
                        onClick={() => handleValidation("refuser")}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </section>

      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Modifier de Produit")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form form-vertical" onSubmit={handleSubmit}>
            <div className="form-body">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="label">{t("Libellé")}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="label"
                      maxLength="25"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="image">{t("Image")}</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="initialStock">{t("Stock initial")}</label>
                    <input
                      type="number"
                      className="form-control"
                      id="initialStock"
                      value={initialStock}
                      onChange={(e) => setInitialStock(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="currentStock">{t("Stock actuel")}</label>
                    <input
                      type="number"
                      className="form-control"
                      id="currentStock"
                      value={currentStock}
                      onChange={(e) => setCurrentStock(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="color">{t("Couleur")}</label>
                    <input
                      type="color"
                      className="form-control"
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="description">{t("Description")}</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    {t("Sauvegarder")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DemandeCatAdmin;
