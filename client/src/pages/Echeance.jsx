import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function Echeance() {

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
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>
        <section className="section">
          <div className="row" id="table-contexual">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h2 className="new-price">{t("Liste echéance")}</h2>
                </div>
                <div className="card-content">
                  <div className="table-responsive">
                    {isMobile ? (
                      <table className="table">
                        <tbody>
                          <tr></tr>
                          <tr>
                            <td>{t("Date payement")}</td>
                            <td>
                                Lorem
                            </td>
                          </tr>
                          <tr>
                            <td>{t("Montant à payer")}</td>
                            <td>Lorem</td>
                          </tr>
                          <tr>
                            <td>{t("Montant restant")}</td>
                            <td>Lorem Lorem</td>
                          </tr>
                          <tr>
                            <td>{t("Montant à payer chaque mois")}</td>
                            <td>Lorem Lorem</td>
                          </tr>
                          <td colSpan="2">
                            <hr />
                          </td>
                        </tbody>
                      </table>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>{t("Date payement")}</th>
                            <th>{t("Montant à payer")}</th>
                            <th>{t("Montant restant")}</th>
                            <th>{t("Montant à payer chaque mois")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Lorem</td>
                            <td> Lorem Lorem </td>
                            <td className="text-bold-500">
                              {t("Lorem Lorem")}
                            </td>
                            <td>Lorem Lorem</td>
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
    </div>
  );
}