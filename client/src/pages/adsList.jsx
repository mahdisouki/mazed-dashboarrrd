import React, { useState, useEffect , useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useTranslation } from "react-i18next";
import { GlobalState } from '../GlobalState';
import axios from 'axios';

function AdsList() {
  const { t } = useTranslation();
  const [showImageModal, setShowImageModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showCarouselModal, setShowCarouselModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
  const [isMobile, setIsMobile] = useState(false);
  const [editType, setEditType] = useState('');
  const [uploadInputs, setUploadInputs] = useState([]);
  const state = useContext(GlobalState)
  const annonces = state.Annonces
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

  const handleDelete = (id) => {
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
        deleteItem(id);
        Swal.fire({   title: "Supprimer",
          text: "Votre élément est Supprimer:)",
          icon: "Succes",
          confirmButtonColor: "#b0210e",
        });       } else {
          Swal.fire({   title: "Annulé",
            text: "Votre élément est en sécurité :)",
            icon: "error",
            confirmButtonColor: "#b0210e",
          });      }
    });
  };

  const deleteItem = async(id) => {
   try {
    const res = await axios.delete(``);
    console.log(res.data)
   } catch (error) {
    console.log(error)
   }
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditType(''); // Reset edit type
    setUploadInputs([]); // Clear upload inputs
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
    closeEditModal(); // Example: Close modal after save
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
                    <tr>
                      <td>{t("Date de création")}</td>
                      <td>01/01/2024</td>
                    </tr>
                    <tr>
                      <td>{t("Date de publication")}</td>
                      <td>05/05/2024</td>
                    </tr>
                    <tr>
                      <td>{t("Type")}</td>
                      <td>{t("Image")}</td>
                    </tr>
                    <tr>
                      <td>{t("Voir")}</td>
                      <td>
                        <Button className="btn" onClick={() => setShowImageModal(true)}>
                          <i className="fa-solid fa-eye"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>{t("Editer")}</td>
                      <td>
                        <Button className="btn" onClick={openEditModal}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>{t("Supprimer")}</td>
                      <td>
                        <i className="fa-solid fa-trash deleteIcon" onClick={handleDelete}></i>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2"><hr /></td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table" id="table1">
                  <thead>
                    <tr>
                      <th>{t("Date de création")}</th>
                      <th>{t("Date de publication")}</th>
                      <th>{t("Type")}</th>
                      <th>{t("Voir")}</th>
                      <th>{t("Editer")}</th>
                      <th>{t("Supprimer")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      annonces&&annonces.map((item)=>(
                        <tr>
                          <td>{item.createdAt?.split("T")[0]}</td>
                          <td>{item.datePublication}</td>
                          <td>{item.type}</td>
                          <td>
                            <Button className="btn" onClick={() => setShowImageModal(true)}>
                              <i className="fa-solid fa-eye"></i>
                            </Button>
                          </td>
                          <td>
                            <Button className="btn" onClick={openEditModal}>
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Button>
                          </td>
                          <td>
                            <i className="fa-solid fa-trash deleteIcon" onClick={()=>handleDelete(item.id)}></i>
                          </td>
                        </tr>
                      ))
                    }
                    
                   
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

        {/* Other Modals (Image, Video, Carousel) */}
        <Modal show={showImageModal} onHide={() => setShowImageModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("Image")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Image content */}
            <img src="/assets/compiled/jpg/architecture1.jpg" className="img-fluid" alt={t("Image")} />
            <div className="mt-3">
              <label>{t("Date de création")}</label>
              <input type="text" className="form-control" value="01/01/2024" disabled />
            </div>
            <div className="mt-3">
              <label>{t("Date de publication")}</label>
              <input type="text" className="form-control" value="05/05/2024" disabled />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowImageModal(false)}>{t("Fermer")}</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showVideoModal} onHide={() => setShowVideoModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("Video")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Video content */}
            <video className="img-fluid" autoPlay controls>
              <source src="/assets/compiled/video/exemple.mp4" type="video/mp4" />
              {t("Your browser does not support the video tag.")}
            </video>
            <div className="mt-3">
              <label>{t("Date de création")}</label>
              <input type="text" className="form-control" value="02/02/2024" disabled />
            </div>
            <div className="mt-3">
              <label>{t("Date de publication")}</label>
              <input type="text" className="form-control" value="07/07/2024" disabled />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowVideoModal(false)}>{t("Fermer")}</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showCarouselModal} onHide={() => setShowCarouselModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{t("Carousel")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Carousel content */}
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="/assets/compiled/jpg/architecture1.jpg" className="d-block w-100" alt={t("Carousel")} />
                </div>
                <div className="carousel-item">
                  <img src="/assets/compiled/jpg/architecture2.jpg" className="d-block w-100" alt={t("Carousel")} />
                </div>
                <div className="carousel-item">
                  <img src="/assets/compiled/jpg/architecture3.jpg" className="d-block w-100" alt={t("Carousel")} />
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <div className="mt-3">
              <label>{t("Date de création")}</label>
              <input type="text" className="form-control" value="03/01/2024" disabled />
            </div>
            <div className="mt-3">
              <label>{t("Date de publication")}</label>
              <input type="text" className="form-control" value="07/05/2024" disabled />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCarouselModal(false)}>{t("Fermer")}</Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
}

export default AdsList;
