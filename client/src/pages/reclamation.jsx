import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Form } from "react-bootstrap";

function Reclamation() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [reclamationText, setReclamationText] = useState("");

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

  const handleSendReclamation = () => {
    // Handle sending reclamation text here
    console.log("Sending reclamation:", reclamationText);

    // Close modal after sending
    setShowModal1(false);
  };

  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>
        <section className="section">
          <div className="row" id="table-contexual">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h2 className="new-price">{t("Tableau de Réclamation")}</h2>
                </div>
                <div className="card-content">
                  <div className="table-responsive">
                    {isMobile ? (
                      <table className="table">
                        <tbody>
                          <tr>
                            <td>{t("Date")}</td>
                            <td>10/10/2024</td>
                          </tr>
                          <tr>
                            <td>{t("Utilisateur")}</td>
                            <td>{t("Lorem Lorem")}</td>
                          </tr>
                          <tr>
                            <td>{t("Sujet")}</td>
                            <td>{t("Lorem Lorem")}</td>
                          </tr>
                          <tr>
                            <td>{t("Statut")}</td>
                            <td>
                              <span className="badge bg-secondary">{t("Ouverte")}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>{t("Détail")}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline block"
                                onClick={() => setShowModal1(true)}
                              >
                                <i className="fa-solid fa-eye font-medium-1"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2"><hr /></td>
                          </tr>
                          <tr>
                            <td>{t("Date")}</td>
                            <td>10/10/2024</td>
                          </tr>
                          <tr>
                            <td>{t("Utilisateur")}</td>
                            <td>{t("Lorem Lorem")}</td>
                          </tr>
                          <tr>
                            <td>{t("Sujet")}</td>
                            <td>{t("Lorem Lorem")}</td>
                          </tr>
                          <tr>
                            <td>{t("Statut")}</td>
                            <td>
                              <span className="badge bg-danger">{t("Fermée")}</span>
                            </td>
                          </tr>
                          <tr>
                            <td>{t("Détail")}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline block"
                                onClick={() => setShowModal2(true)}
                              >
                                <i className="fa-solid fa-eye font-medium-1"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>{t("Date")}</th>
                            <th>{t("Utilisateur")}</th>
                            <th>{t("Sujet")}</th>
                            <th>{t("Statut")}</th>
                            <th>{t("Détail")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-bold-500">10/10/2024</td>
                            <td>{t("Lorem Lorem")}</td>
                            <td className="text-bold-500">{t("Lorem Lorem")}</td>
                            <td>
                              <span className="badge bg-secondary">{t("Ouverte")}</span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline block"
                                onClick={() => setShowModal1(true)}
                              >
                                <i className="fa-solid fa-eye font-medium-1"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-bold-500">10/10/2024</td>
                            <td>{t("Lorem Lorem")}</td>
                            <td className="text-bold-500">{t("Lorem Lorem")}</td>
                            <td>
                              <span className="badge bg-danger">{t("Fermée")}</span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline block"
                                onClick={() => setShowModal2(true)}
                              >
                                <i className="fa-solid fa-eye font-medium-1"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <Modal show={showModal1} onHide={() => setShowModal1(false)}>
        <Modal.Header closeButton>
        <Modal.Title>{t("Réclamation")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please provide details of your reclamation.</p>
          <Form.Control
            as="textarea"
            rows={3}
            value={reclamationText}
            onChange={(e) => setReclamationText(e.target.value)}
            placeholder={t("Enter your reclamation here")}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSendReclamation}>
            {t("Envoyer")}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal2} onHide={() => setShowModal2(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Réclamation")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please provide details of your reclamation.</p>
          <Form.Control
            as="textarea"
            rows={3}
            value={reclamationText}
            onChange={(e) => setReclamationText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSendReclamation}>
            {t("Envoyer")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Reclamation;
