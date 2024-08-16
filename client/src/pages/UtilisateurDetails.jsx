import React from "react";
import { Link  } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';

function UtilisateurDetails() {
  const location = useLocation();
  const { user } = location.state || {}; 
  const { t } = useTranslation();

  
  const handleBlockClick = () => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui"),
      cancelButtonText: t("Non"),
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
        Swal.fire(
          t("Désactivé(e) !"),
          t("Votre élément a été désactivé."),
          "secondary"
        );
      } else {
        Swal.fire(t("Annulé"), t("Votre élément est en sécurité :)"), "error");
      }
    });
  };

  const handleUnblockClick = () => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui"),
      cancelButtonText: t("Non"),
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
        Swal.fire(
          t("Débloqué(e)"),
          t("Votre élément a été débloqué."),
          "secondary"
        );
      } else {
        Swal.fire(t("Annulé"), t("Votre élément est en sécurité :)"), "error");
      }
    });
  };
  const deleteItem = () => {
    // Your delete logic here
  };
  console.log("useeeeeeeeer" , user)
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
                  <h3>{t("Détail d’utilisateur")}</h3>
                </div>
                <div className="col-12 col-md-6 order-md-2 order-first"></div>
              </div>
            </div>
            <section className="section">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <div className="avatar avatar-xl">
                          <img
                            style={{
                              width: "48px",
                              height: "48px",
                              borderRadius: "25px",
                            }}
                            src="assets/static/images/faces/2.jpg"
                            alt={t("Avatar")}
                          />
                        </div>
                      </div>
                      <div className="card-body">
                        <form action="#" method="get">
                          <div className="form-group">
                            <label htmlFor="name" className="form-label">
                              {t("Nom")}
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              className="form-control"
                              placeholder={t("Entrez le nom")}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="firstname" className="form-label">
                              {t("Prénom")}
                            </label>
                            <input
                              type="text"
                              name="firstname"
                              id="firstname"
                              className="form-control"
                              placeholder={t("Entrez le prénom")}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="username" className="form-label">
                              {t("Pseudo")}
                            </label>
                            <input
                              type="text"
                              name="username"
                              id="username"
                              className="form-control"
                              placeholder={t("Entrez le pseudo")}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="role" className="form-label">
                              {t("Role")}
                            </label>
                            <input
                              type="text"
                              name="role"
                              id="role"
                              className="form-control"
                              placeholder={t("Entrez le rôle")}
                              defaultValue="John Doe"
                              disabled
                            />
                          </div>
                          <div className="form-group">
                            <button
                              type="submit"
                              className="btn btn-danger me-2"
                              onClick={handleBlockClick}
                            >
                              {t("Bloquer")}
                            </button>
                            <button
                              type="submit"
                              className="btn btn-secondary me-2"
                              onClick={handleUnblockClick}
                            >
                              {t("Débloquer")}
                            </button>
                            <Link
                              to="/UtilisateurEdit"
                              className="btn btn-secondary"
                            >
                              {t("Editer")}
                            </Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UtilisateurDetails;
