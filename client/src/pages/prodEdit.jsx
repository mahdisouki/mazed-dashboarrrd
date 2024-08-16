import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductEditForm = () => {
  const { t } = useTranslation();
  const [label, setLabel] = useState("");
  const [image, setImage] = useState(null);
  const [initialStock, setInitialStock] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [color, setColor] = useState("#ffffff"); // Default color
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // like sending data to a server.
    console.log({
      label,
      image,
      initialStock,
      currentStock,
      color,
      description,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="content-container">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h2 className="new-price">{t("Editer de Produit")}</h2>
        </div>
        <div className="card-content">
          <div className="card-body">
            <form className="form form-vertical" onSubmit={handleSubmit}>
              <div className="form-body">
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="first-name-icon">{t("Libellé")}</label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control"
                          id="first-name-icon"
                          maxLength="25"
                          value={label}
                          onChange={(e) => setLabel(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="email-id-icon">{t("Image")}</label>
                      <div className="position-relative">
                        <input
                          type="file"
                          className="form-control"
                          id="email-id-icon"
                          onChange={handleImageChange}
                        />
                        <div className="form-control-icon">
                          <i className="bi bi-bookmark"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="mobile-id-icon">{t("Stock initial")}</label>
                      <div className="position-relative">
                        <input
                          type="number"
                          className="form-control"
                          id="mobile-id-icon"
                          value={initialStock}
                          onChange={(e) => setInitialStock(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="password-id-icon">{t("Stock actuel")}</label>
                      <div className="position-relative">
                        <input
                          type="number"
                          className="form-control"
                          id="password-id-icon"
                          value={currentStock}
                          onChange={(e) => setCurrentStock(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="color-picker">{t("Couleurs")}</label>
                      <input
                        type="color"
                        className="form-control"
                        id="color-picker"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        {t("Description")}
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-3">
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
};

export default ProductEditForm;
