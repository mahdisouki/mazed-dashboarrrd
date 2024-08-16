import React from "react";
import { useTranslation } from "react-i18next";

function UtilisateurEdit() {
  const { t } = useTranslation();

  return (
    <div className="content-container">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">{t("Modifier d'un utilisateur")}</h4>
          </div>
          <div className="card-content">
            <div className="card-body">
              <form className="form form-vertical">
                <div className="form-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="email-id-icon">{t("Nom")}</label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="email-id-icon"
                            maxLength={25}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="email-id-icon">{t("Prénom")}</label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="email-id-icon"
                            maxLength={25}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="email-id-icon">{t("Pseudo")}</label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            id="email-id-icon"
                            maxLength={25}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="disabledInput">{t("Email")}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="disabledInput"
                        placeholder={t("Email ici")}
                        disabled
                      />
                    </div>
                    <label>{t("Numéro de téléphone")}</label>
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        aria-label={t("Username")}
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    <label htmlFor="email">{t("Role")}</label>
                    <div className="input-group mb-3">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        {t("Options")}
                      </label>
                      <select className="form-select" id="inputGroupSelect01">
                        <option selected>{t("Choisir...")}</option>
                        <option value={1}>{t("One")}</option>
                        <option value={2}>{t("Two")}</option>
                        <option value={3}>{t("Three")}</option>
                      </select>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-secondary me-3"
                      >
                        {t("Annuler")}
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
  );
}

export default UtilisateurEdit;
