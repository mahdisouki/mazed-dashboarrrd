import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DemandeProduit() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [starClicked, setStarClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deleteItem = () => {
    console.log("Item deleted");
  };

  const handleDelete = () => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      text: t(
        "Une fois supprimé(e), vous ne pourrez pas récupérer cet élément !"
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F9B853",
      confirmButtonText: t("Oui, annuler-le !"),
      cancelButtonText: t("Non, annuler !"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
        Swal.fire({
          title: "Annuler",
          text: "Votre élément est Supprimer :)",
          icon: "success",
          confirmButtonColor: "#F9B853",
        });
      } else {
        Swal.fire({
          title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#F9B853",
        });
      }
    });
  };

  const handleBan = () => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F9B853",
      confirmButtonText: t("Oui, Valider-le !"),
      cancelButtonText: t("Non, annuler !"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
        Swal.fire({
          title: "Valider",
          text: "Votre élément est Validee :)",
          icon: "success",
          confirmButtonColor: "#F9B853",
        });
      } else {
        Swal.fire({
          title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#F9B853",
        });
      }
    });
  };

  const handleArrowClick = () => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F9B853",
      confirmButtonText: t("Oui, mettre à l'une !"),
      cancelButtonText: t("Non, annuler !"),
    }).then((result) => {
      if (result.isConfirmed) {
        setStarClicked(!starClicked);
        Swal.fire({
          title: "Effectuer",
          text: "Votre élément est Effectuer :)",
          icon: "success",
          confirmButtonColor: "#F9B853",
        });
      } else {
        Swal.fire({
          title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#F9B853",
        });
      }
    });
  };

  return (
    <div className="content-container">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h2 className="new-price">{t("Demande Produit")}</h2>
          </div>
          <div className="card-body">
            <Table responsive="sm">
              {isMobile ? (
                <tbody>
                  <tr>
                    <td>{t("Photo de Profile")}</td>
                    <td>
                      <img
                        style={{ borderRadius: "50px" }}
                        className="imgtable"
                        src="./Mazed.jpg"
                        alt="img"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Nom")}</td>
                    <td>Lorem</td>
                  </tr>
                  <tr>
                    <td>{t("Prénom")}</td>
                    <td>Lorem</td>
                  </tr>
                  <tr>
                    <td>{t("Lib Produit")}</td>
                    <td>
                      <img className="imgtable" src="./Mazed.jpg" alt="img" />
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Catégorie")}</td>
                    <td>Lorem</td>
                  </tr>
                  <tr>
                    <td>{t("Prix")}</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>{t("Stock")}</td>
                    <td>10</td>
                  </tr>
                  <tr>
                    <td>{t("Détail")}</td>
                    <td>
                      <Link
                        to="/DetailDemandeProduit"
                        className="btn btn-outline block"
                      >
                        <i className="fa-solid fa-eye font-medium-1"></i>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Valider")}</td>
                    <td>
                      <i onClick={handleBan} className="fa-solid fa-check"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Annuler")}</td>
                    <td>
                      <i
                        onClick={handleDelete}
                        className="fa-solid fa-xmark"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <>
                  <thead>
                    <tr>
                      <th>{t("Photo de Profile")}</th>
                      <th>{t("Nom")}</th>
                      <th>{t("Prénom")}</th>
                      <th>{t("Lib Produit")}</th>
                      <th>{t("Catégorie")}</th>
                      <th>{t("Prix")}</th>
                      <th>{t("Stock")}</th>
                      <th>{t("Détail")}</th>
                      <th>{t("Valider")}</th>
                      <th>{t("Annuler")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img
                          style={{ borderRadius: "50px" }}
                          className="imgtable"
                          src="./Mazed.jpg"
                          alt="img"
                        />
                      </td>
                      <td>lorem</td>
                      <td>Lorem</td>
                      <td>
                        <img className="imgtable" src="./Mazed.jpg" alt="img" />
                      </td>
                      <td>Lorem</td>
                      <td>10</td>
                      <td>10</td>
                      <td>
                        <Link
                          to="/DetailDemandeProduit"
                          className="btn btn-outline block"
                        >
                          <i className="fa-solid fa-eye font-medium-1"></i>
                        </Link>
                      </td>
                      <td>
                        <i
                          onClick={handleBan}
                          className="fa-solid fa-check"
                        ></i>
                      </td>
                      <td>
                        <i
                          onClick={handleDelete}
                          className="fa-solid fa-xmark"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DemandeProduit;
