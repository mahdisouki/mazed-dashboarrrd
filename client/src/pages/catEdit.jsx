import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

function CategoryModificationForm() {
  const { t } = useTranslation();
  const [label, setLabel] = useState('');
  const [type, setType] = useState('');

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would typically handle the submission logic, e.g., sending data to a server
    console.log('Submitted:', { label, type });
  };

  const handleCancel = () => {
    // Logic to handle cancel, e.g., clearing form or navigating away
    console.log('Form canceled');
  };

  return (
    <div className="content-container">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2 className="new-price">{t("Modification d'une catégorie")}</h2>
        </div>
        <div className="card-content">
          <div className="card-body">
            <form className="form form-vertical" onSubmit={handleSubmit}>
              <div className="form-body">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="email-id-icon">{t("Libellé")}</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email-id-icon"
                        maxLength="25"
                        value={label}
                        onChange={handleLabelChange}
                      />
                    </div>
                  </div>
                  <label>{t("Type")}</label>
                  <div className="input-group mb-3">
                    <select
                      className="form-select"
                      id="inputGroupSelect01"
                      value={type}
                      onChange={handleTypeChange}
                    >
                      <option value="1">{t("Parente")}</option>
                      <option value="2">{t("Fille")}</option>
                    </select>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleCancel}
                    >
                      {t("Annuler")}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="suivantBtn"
                    >
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

export default CategoryModificationForm;
