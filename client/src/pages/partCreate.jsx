import React from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>

        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="new-price">{t("Ajouter un Participant")}</h2>
            </div>
            <div className="card-content">
              <div className="card-body">
                <form className="form form-vertical">
                  <div className="form-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="nom">{t("Nom")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="nom"
                              placeholder={t("Nom")}
                              maxLength="25"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="prenom">{t("Prénom")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="prenom"
                              placeholder={t("Prénom")}
                              maxLength="25"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="pseudo">{t("Pseudo")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="pseudo"
                              placeholder={t("Pseudo")}
                              maxLength="25"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="email">{t("Email")}</label>
                          <div className="position-relative">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder={t("Email")}
                              maxLength="25"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="mb-1">
                          {t("Numéro de téléphone")}
                        </label>
                        <div className="input-group mb-4">
                          <input
                            type="number"
                            className="form-control"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        {/* Cancel Button */}
                        <button
                          type="button"
                          className="btn btn-light-secondary me-2"
                          data-bs-dismiss="modal"
                        >
                          <i className="bx bx-x d-block d-sm-none"></i>
                          <span className="btn btn-secondary me-3">
                            {t("Annuler")}
                          </span>
                        </button>
                        <button type="button" className="btn btn-primary">
                          {t("Enregistrer")}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
