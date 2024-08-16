import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function VendeurDetails() {
  const { t } = useTranslation();
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

  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="page-heading"></div>
        <div className="page-content">
          <div className="page-heading">
            <div className="page-title">
              <div className="row">
                <div className="col-12 col-md-6 order-md-1 order-last">
                  <h3>{t("Détails d’un vendeur")}</h3>
                </div>
                <div className="col-12 col-md-6 order-md-2 order-first"></div>
              </div>
            </div>
            <section className="section">
              <div className="row">
                <div className="col-12">
                  <div className="card mb-4">
                    {" "}
                    {/* Added mb-4 for spacing */}
                    <div className="card-body">
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
                      <div className="card-body">
                        <form action="#" method="get">
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">
                              {t("Date d’inscription")}
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder={12222222222}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">
                              {t("Nombre de produits déposés dans la boutique")}
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder={222}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">
                              {t("Les ventes")}
                            </label>
                            <input
                              type="number"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder={222}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">
                              {t("L’évaluation")}
                            </label>
                            <input
                              type="number"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder={222}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">
                              {t("Les réclamations")}
                            </label>
                            <input
                              type="number"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder={222}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-danger me-2"
                            >
                              {t("Bloquer")}
                            </button>
                            <button type="submit" className="btn btn-secondary">
                              {t("Débloquer")}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                    <div className="card-header">
                      <h5 className="card-title">{t("Ventes")}</h5>
                    </div>
                      <div className="table-responsive datatable-minimal">
                        {isMobile ? (
                          <table className="table" id="table2">
                            <tbody>
                              <tr>
                                <td>{t("Le stock à l’entrée")}</td>
                                <td>500</td>
                              </tr>
                              <tr>
                                <td>{t("Le stock actuel")}</td>
                                <td>200</td>
                              </tr>
                              <tr>
                                <td>{t("Le prix de vente")}</td>
                                <td>20</td>
                              </tr>
                              <tr>
                                <td>{t("Les promotions")}</td>
                                <td>20%</td>
                              </tr>
                              <tr>
                                <td>{t("L’évaluation")}</td>
                                <td>Lorem</td>
                              </tr>
                              <tr>
                                <td>{t("Le nombre de visites sur produit")}</td>
                                <td>350</td>
                              </tr>
                            </tbody>
                          </table>
                        ) : (
                          <table className="table" id="table2">
                            <thead>
                              <tr>
                                <th>{t("Le stock à l’entrée")}</th>
                                <th>{t("Le stock actuel")}</th>
                                <th>{t("Le prix de vente")}</th>
                                <th>{t("Les promotions")}</th>
                                <th>{t("L’évaluation")}</th>
                                <th>{t("Le nombre de visites sur produit")}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>500</td>
                                <td>200</td>
                                <td>20</td>
                                <td>20%</td>
                                <td>Lorem</td>
                                <td>350</td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendeurDetails;
