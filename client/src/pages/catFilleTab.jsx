import React from 'react';
import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';

function catFilleTab() {
  return (
    <section className="section">
    <div className="content-container">
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <h4 className="card-title">Carousel</h4>
                <h6 className="card-subtitle">Support card subtitle</h6>
              </Card.Body>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="./test.jpg"
                    alt="Image Architecture"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="./test.jpg"
                    alt="Image Mountain"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="./test.jpg"
                    alt="Image Jump"
                  />
                </Carousel.Item>
              </Carousel>
              <Card.Body>
                <p className="card-text">Détail produit</p>
                <p className="card-text">Critères</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default catFilleTab;
