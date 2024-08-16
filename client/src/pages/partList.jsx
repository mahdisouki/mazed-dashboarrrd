import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function ParticipantList() {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const participants = [
    {
      id: 1,
      name: "Alex",
      username: "vehi",
      phone: "20202020",
      registrationDate: "01/01/2024",
      purchaseCount: 1,
      bidCount: 1,
    },
  ];

  const handleLockUnlock = (action, item) => {
    Swal.fire({
      title: t(`Êtes-vous sûr?`),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t(`Oui`),
      cancelButtonText: t("Non, annuler!"),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          {
            confirmButtonColor: "#b0210e",
            title:"fait"
          }
        );
      } else {
        Swal.fire({   title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });       }
    });
  };

  return (
    <div className="content-container">
    <section className="section">
      <div className="card">
        <div className="card-header">
          <h2>{t("Liste des participants")}</h2>
        </div>
        <div className="row" style={{ padding: "0 20px" }}>
          <div className="col-md-3 mb-4">
            <h6>{t("Etat")}</h6>
            <fieldset className="form-group">
              <select className="form-select" id="basicSelect1">
                <option disabled selected>
                  {t("Choose Etat")}
                </option>
                <option> Active </option>
                <option> Inactive </option>
              </select>
            </fieldset>
          </div>
          <div className="col-md-3 mb-4">
            <h6> Participe </h6>
            <fieldset className="form-group">
              <select className="form-select" id="basicSelect2">
                <option disabled selected>
                  {t("Choose Participe")}
                </option>
                <option> Oui </option>
                <option> Non </option>
              </select>
            </fieldset>
          </div>
          <div className="col-md-3 mb-4">
            <h6>{t("Gagnant")}</h6>
            <fieldset className="form-group">
              <select className="form-select" id="basicSelect3">
                <option disabled selected>
                  {t("Choose Gagnant")}
                </option>
                <option> Oui </option>
                <option> Non </option>
              </select>
            </fieldset>
          </div>
          <div className="col-md-3 mb-4">
            <h6>{t("Statut")}</h6>
            <fieldset className="form-group">
              <select className="form-select" id="basicSelect3">
                <option disabled selected>
                  {t("Choose Statut")}
                </option>
                <option> Nouveau </option>
                <option> Ancien </option>
              </select>
            </fieldset>
          </div>
        </div>
        <div className="card-body">
          {isMobile ? (
            <Table responsive="sm">
              <tbody>
                {participants.map((participant) => (
                  <React.Fragment key={participant.id}>
                    <tr>
                      <td>{t("Nom et prénom")}</td>
                      <td>{participant.name}</td>
                    </tr>
                    <tr>
                      <td>{t("Pseudo")}</td>
                      <td>{participant.username}</td>
                    </tr>
                    <tr>
                      <td>{t("Num tél")}</td>
                      <td>{participant.phone}</td>
                    </tr>
                    <tr>
                      <td>{t("Date inscri")}</td>
                      <td>{participant.registrationDate}</td>
                    </tr>
                    <tr>
                      <td>{t("Nbr d'achats")}</td>
                      <td>{participant.purchaseCount}</td>
                    </tr>
                    <tr>
                      <td>{t("Nbr d'enchères")}</td>
                      <td>{participant.bidCount}</td>
                    </tr>
                    <tr>
                      <td>{t("Détail")}</td>
                      <td>
                        <Button variant="link" onClick={() => setModalShow(true)}>
                          <Link to="/partdetail">
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>{t("Bloquer")}</td>
                      <td>
                        <i
                          className="fa-solid fa-lock"
                          onClick={() => handleLockUnlock("lock", participant.id)}
                        ></i>
                      </td>
                    </tr>
                    <tr>
                      <td>{t("Débloquer")}</td>
                      <td>
                        <i
                          className="fa-solid fa-unlock"
                          onClick={() => handleLockUnlock("unlock", participant.id)}
                        ></i>
                      </td>
                    </tr>
                    <tr>
                      {/* <td>{t("Solde")}</td>
                      <td>
                        <i
                          className="fa-solid fa-sack-dollar"
                          onClick={() => setModalShow(true)}
                        ></i>
                      </td> */}
                    </tr>
                    <tr>
                      <td colSpan="2"><hr /></td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          ) : (
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>{t("Nom et prénom")}</th>
                  <th>{t("Pseudo")}</th>
                  <th>{t("Num tél")}</th>
                  <th>{t("Date inscri")}</th>
                  <th>{t("Nbr d'achats")}</th>
                  <th>{t("Nbr d'enchères")}</th>
                  <th>{t("Détail")}</th>
                  <th>{t("Bloquer")}</th>
                  <th>{t("Débloquer")}</th>
                  {/* <th>{t("Solde")}</th> */}
                </tr>
              </thead>
              <tbody>
                {participants.map((participant) => (
                  <tr key={participant.id}>
                    <td>{participant.name}</td>
                    <td>{participant.username}</td>
                    <td>{participant.phone}</td>
                    <td>{participant.registrationDate}</td>
                    <td>{participant.purchaseCount}</td>
                    <td>{participant.bidCount}</td>
                    <td>
                      <Button variant="link" onClick={() => setModalShow(true)}>
                        <Link to="/partdetail">
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                      </Button>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-lock"
                        onClick={() => handleLockUnlock("lock", participant.id)}
                      ></i>
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-unlock"
                        onClick={() => handleLockUnlock("unlock", participant.id)}
                      ></i>
                    </td>
                    {/* <td>
                      <i
                        className="fa-solid fa-sack-dollar"
                        onClick={() => setModalShow(true)}
                      ></i>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("Ajouter Montant")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t("Montant")}</Form.Label>
              <Form.Control type="number" placeholder={t("Entrez le montant")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("Manière de recharge")}</Form.Label>
              <Form.Select>
                <option>{t("Virement bancaire")}</option>
                <option>{t("Chèque")}</option>
                <option>{t("Transfert du solde")}</option>
                <option>{t("Visite Bureau Mazed")}</option>
                <option>{t("Carte de recharge")}</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("Ajouter")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
    </div>
  );
}

export default ParticipantList;
