import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function AdminEdit() {
  const { t } = useTranslation();
  const { id, name, pseudo, role } = useParams();

  return (
    <div className="content-container">
      <div id="app">
        <div id="main">
          <header className="mb-3">
            <a href="#" className="burger-btn d-block d-xl-none">
              <i className="bi bi-justify fs-3" />
            </a>
          </header>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h2 className="new-price">{t("modification d'un administrateur")}</h2>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <form className="form form-vertical">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="name-id">{t("Nom")}</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                id="name-id"
                                placeholder="Nom"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="pseudo-id">{t("Pseudo")}</label>
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control"
                                id="pseudo-id"
                                placeholder="Pseudo"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="role-id">{t("Role")}</label>
                            <fieldset className="form-group mb-3">
                              <select className="form-select" id="role-id" defaultValue={role}>
                                <option>IT</option>
                                <option>Blade Runner</option>
                                <option>Thor Ragnarok</option>
                              </select>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary me-2">
                          {t("Annuler")}
                        </button>
                        <button type="submit" className="btn btn-primary" id="suivantBtn">
                          {t("Enregistrer")}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEdit;
