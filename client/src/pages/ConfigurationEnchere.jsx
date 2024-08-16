import React from "react";
import { useTranslation } from "react-i18next";

function ConfigurationEnchere() {
  const { t } = useTranslation();
  return (
    <>
      <div className="content-container">
        <div className="card">
          <div id="main">
            <header className="mb-3">
              <a href="#" className="burger-btn d-block d-xl-none">
                <i className="bi bi-justify fs-3" />
              </a>
            </header>
            <div className="card-content">
              <div className="card-body">
                <form className="form form-vertical">
                  <div className="form-body">
                    <div className="row">
                      <div className="col-12">
                        <h2 className="new-price">Configuration de l'enchére</h2>
                        <br />
                        <div className="col-12 checkbox">
                          <input
                            type="checkbox"
                            id="checkbox11"
                            className="col-6 form-check-input"
                            defaultChecked
                            onclick
                          />{" "}
                          <span>{t("Facilité")}</span>
                        </div>
                        <br />
                        <div className="col-12">
                          <input
                            type="text"
                            id="email-id-vertical11"
                            className="col-6 form-control"
                            name="email-id"
                            placeholder="Ecrire Ici"
                            required
                          />
                        </div>
                        <br />
                        <br />
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="date">
                              {t("Durée d'une enchere en cours")}
                            </label>
                            <input
                              type="datetime-local"
                              id="password-vertical"
                              className="form-control"
                              name
                              placeholder="Ecrire Ici "
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="date">
                              {t("Durée pour passer de l'enchere ouverte a l'enchere prete")}
                            </label>
                            <input
                              type="datetime-local"
                              id="password-vertical"
                              className="form-control"
                              name
                              placeholder="Ecrire Ici "
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="date">
                              {t("Durée pour garder l'enchere terminée affichée")}
                            </label>
                            <input
                              type="datetime-local"
                              id="password-vertical"
                              className="form-control"
                              name
                              placeholder="Ecrire Ici "
                            />
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                          <button
                            type="submit"
                            className="btn btn-primary me-1 mb-1"
                          >
                            {t("Enregistrer")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfigurationEnchere;
