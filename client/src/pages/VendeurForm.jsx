import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function VendeurForm() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState("square");
  const [birthdate, setBirthdate] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="new-price">{t("Ajouter un Vendeur")}</h2>
            </div>
            <div className="card-content">
              <div className="card-body">
                <form className="form form-vertical">
                  <div className="form-body">
                    <div className="row g-2">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="nom">{t("Nom")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="nom"
                              placeholder={t("Nom")}
                              maxLength={25}
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
                              maxLength={25}
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
                              maxLength={25}
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
                              placeholder="email"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="telephone">{t("Numéro de téléphone")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="telephone"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>{t("Date de Naissance")}</label>
                          <div className="position-relative">
                            <input
                              type="date"
                              className="form-control"
                              id="birthdate"
                              value={birthdate}
                              onChange={handleBirthdateChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>{t("Type vendeurs")}</label>
                          <select
                            className="choices form-select"
                            value={selectedType}
                            onChange={handleTypeChange}
                          >
                            <option value="square">{t("Professionel")}</option>
                            <option value="rectangle">{t("Particulier")}</option>
                          </select>
                        </div>
                      </div>
                      {selectedType === "square" && (
                        <>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="patente">{t("Patente")}</label>
                              <div className="position-relative">
                                <input
                                  type="file"
                                  className="form-control"
                                  id="patente"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="nom-societe">{t("Nom de societe")}</label>
                              <div className="position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="nom-societe"
                                  placeholder="Nom de societe"
                                  maxLength={25}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      <div className="col-12">
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary me-2"
                            data-bs-dismiss="modal"
                          >
                            <i className="bx bx-x d-block d-sm-none" />
                            <span className="d-none d-sm-block">
                              {t("Annuler")}
                            </span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            id="suivantBtn"
                          >
                            {t("Valider")}
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
    </div>
  );
}

export default VendeurForm;
