import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";

function PartDetail() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <div className="content-container">
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <div className="avatar avatar-xl">
                    <img
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "5px",
                      }}
                      src="assets/static/images/faces/2.jpg"
                      alt="Avatar"
                    />
                  </div>
                  <h3 className="mt-3">{t("Nom et Prénom")}</h3>
                  <p className="text-small">{t("Pseudo")}</p>
                </div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("Numéro de téléphone")}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="+12222222222"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("Date d’inscription")}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="01/01/2024"
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("Nombre d’achats")}</Form.Label>
                    <Form.Control type="number" placeholder="222" disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("Nombre d’enchères")}</Form.Label>
                    <Form.Control type="number" placeholder="22" disabled />
                  </Form.Group>
                  <Button variant="danger" type="submit" className="me-2">
                    {t("Bloquer")}
                  </Button>
                  <Button variant="secondary" type="submit" className="me-2">
                    {t("Débloquer")}
                  </Button>
                  <Button variant="primary" onClick={handleModalShow}>
                    {t("Ajouter du solde")}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12}></Col>
          {/* Repeat for other sections like auctions and transactions */}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Ajouter du solde")}</Modal.Title>
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
                <option value="square">{t("Virement bancaire")}</option>
                <option value="rectangle">{t("Chèque")}</option>
                <option value="rombo">{t("Transfert du solde")}</option>
                <option value="romboid">{t("Visite Bureau Mazed")}</option>
                <option value="trapeze">{t("Carte de recharge")}</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("Ajouter")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </div>
  );
}

export default PartDetail;
