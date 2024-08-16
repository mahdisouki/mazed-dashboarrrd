import React, { useState, useEffect } from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const App = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const { t } = useTranslation();

  const goBack = () => {
    window.history.back(); // Simulate a browser back button
  };

  useEffect(() => {
    // Initialize Choices for select inputs
    const categoryChoices = new Choices(".category-choices", {
      removeItemButton: true,
      maxItemCount: 5, // Maximum number of items allowed to select
    });

    const subCategoryChoices = new Choices(".sub-category-choices", {
      removeItemButton: true,
      maxItemCount: 5, // Maximum number of items allowed to select
    });

    // Cleanup function
    return () => {
      categoryChoices.destroy();
      subCategoryChoices.destroy();
    };
  }, []);

  const handleImageChange = (e) => {
    const maxFiles = 4; // Maximum number of files allowed
    const files = e.target.files;

    // Check if the number of selected files exceeds the limit
    if (files.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      e.target.value = ""; // Clear the selected files
    } else {
      setImageFiles(Array.from(files));
    }
  };

  return (
    <div id="main">
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3"></i>
        </a>
      </header>

      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h2 className="new-price">{t("Ajouter un nouveau produit")}</h2>
          </div>
          <div className="card-content">
            <div className="card-body">
              <form className="form form-vertical">
                <div className="form-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="first-name-icon">{t("Libellé")}</label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Libellé"
                            id="first-name-icon"
                            maxLength="25"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="email-id-icon">{t("Commerçant")}</label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Commerçant"
                            id="email-id-icon"
                            maxLength="25"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="mobile-id-icon">{t("Prix")}</label>
                        <div className="position-relative">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Prix"
                            id="mobile-id-icon"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <label>{t("Catégories")}</label>
                      <div className="form-group">
                        <select
                          className="choices category-choices form-select multiple-remove"
                          multiple="multiple"
                        >
                          <optgroup label="Figures">
                            <option value="romboid">Romboid</option>
                            <option value="trapeze" selected>
                              Trapeze
                            </option>
                            <option value="triangle">Triangle</option>
                            <option value="polygon">Polygon</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <label>{t("Sous Catégories")}</label>
                      <div className="form-group">
                        <select
                          className="choices sub-category-choices form-select multiple-remove"
                          multiple="multiple"
                        >
                          <optgroup label="Figures">
                            <option value="romboid">Romboid</option>
                            <option value="trapeze" selected>
                              Trapeze
                            </option>
                            <option value="triangle">Triangle</option>
                            <option value="polygon">Polygon</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="password-id-icon">{t("Image")}</label>
                        <div className="position-relative">
                          <input
                            type="file"
                            className="form-control"
                            placeholder="Image"
                            id="password-id-icon"
                            multiple
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="password-id-icon">{t("Stock")}</label>
                        <div className="position-relative">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Stock"
                            id="password-id-icon"
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
                          multiple
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-group">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          {t("Description")}
                        </label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
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
                        <span
                          className="d-none d-sm-block btn btn-secondary me-3"
                          onClick={goBack}
                        >
                          {t("Annuler")}
                        </span>
                      </button>

                      {/* Suivant Button */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        id="suivantBtn"
                      >
                        <Link
                          to="/ProdAction"
                          className="btn-link text-white text-decoration-none"
                          style={{ textDecoration: "none" }} // Added inline style to ensure no underline
                        >
                          {t("Suivant")}
                        </Link>
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

export default App;
