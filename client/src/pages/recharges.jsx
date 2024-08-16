import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Table } from "react-bootstrap";
import Cookies from 'js-cookie'
function Recharges() {
  const token = Cookies.get('token');
  const { t } = useTranslation();
  const state = useContext(GlobalState);
  const cartes = state.cartes;
  const [carteRech, setCarteRech] = useState({ numSérie: "", valeur: "" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      text: t("Une fois supprimé(e), vous ne pourrez pas récupérer cet élément !"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, supprimez-le !"),
      cancelButtonText: t("Non, annuler !"),
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(id);
        Swal.fire({   title: "Supprimer",
          text: "Votre élément est Supprimer:)",
          icon: "Succes",
          confirmButtonColor: "#b0210e",
        });        // window.location.reload();
      } else {
        Swal.fire({   title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });       }
    });
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8081/api/carte/deleteCarte?id=${id}` , {headers : {Authorization: `Bearer ${token}`}});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCarte = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/api/carte/publishNow', carteRech , {headers : {Authorization: `Bearer ${token}`}});
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div id="main">
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3"></i>
        </a>
      </header>

      <section id="form-and-scrolling-components">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="card">
              <div className="card-content">
                <div className="card-body">
                  <div className="form-group">
                    <h2 className="new-price">
                      {t("Vous souhaitez ajouter une nouvelle carte ?")}
                    </h2>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#inlineForm"
                    >
                      <i className="bi bi-plus"></i>
                      {t("Ajouter")}
                    </button>

                    <div
                      className="modal fade text-left"
                      id="inlineForm"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="myModalLabel33"
                      aria-hidden="true"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
                        role="document"
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel33">
                              {t("Ajouter une nouvelle carte")}
                            </h4>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <form onSubmit={addCarte}>
                            <div className="modal-body">
                              <label htmlFor="serialNumber">
                                {t("Numéro de série")}
                              </label>
                              <div className="form-group">
                                <input
                                  id="serialNumber"
                                  type="text"
                                  placeholder={t("Écrivez ici")}
                                  className="form-control"
                                  maxLength="25"
                                  onChange={e => setCarteRech({ ...carteRech, numSérie: e.target.value })}
                                />
                              </div>
                              <label htmlFor="value">{t("Valeur")}</label>
                              <div className="form-group">
                                <input
                                  id="value"
                                  type="text"
                                  placeholder={t("Écrivez ici")}
                                  className="form-control"
                                  maxLength="25"
                                  onChange={e => setCarteRech({ ...carteRech, valeur: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-light-secondary"
                                data-bs-dismiss="modal"
                              >
                                <i className="bx bx-x d-block d-sm-none"></i>
                                <span className="btn btn-secondary">
                                  {t("Annuler")}
                                </span>
                              </button>
                              <button
                                type="submit"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                              >
                                <i className="bx bx-check d-block d-sm-none"></i>
                                <span className="btn btn-primary">
                                  {t("Enregistrer")}
                                </span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section mt-4">
        <div className="card">
          <div className="card-header">
            <h2 className="new-price">{t("Liste des cartes ajoutées")}</h2>
          </div>
          <div className="card-content">
            <div className="card-body">
              {isMobile ? (
                <Table responsive="sm">
                  <tbody>
                    {cartes ? cartes.map((item) => (
                      <React.Fragment key={item.id}>
                        <tr>
                          <td>{t("Numéro de série")}</td>
                          <td className="text-bold-500">{item.numSérie}</td>
                        </tr>
                        <tr>
                          <td>{t("Statut")}</td>
                          <td>
                            <span className={item.statuscarte === "NONUTILISER" ? "badge bg-success" : "badge bg-danger"}>{item.statuscarte}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>{t("Valeur")}</td>
                          <td>{item.valeur}</td>
                        </tr>
                        <tr>
                          <td>{t("Supprimer")}</td>
                          <td>
                            <i
                              className="fa-solid fa-trash deleteIcon"
                              onClick={() => handleDelete(item.id)}
                            ></i>
                          </td>
                        </tr>
                      </React.Fragment>
                    )) : <tr><td colSpan="2">loading</td></tr>}
                  </tbody>
                </Table>
              ) : (
                <div className="table-responsive datatable-minimal">
                  <Table className="table" id="table2">
                    <thead>
                      <tr>
                        <th>{t("Numéro de série")}</th>
                        <th>{t("Statut")}</th>
                        <th>{t("Valeur")}</th>
                        <th>{t("Supprimer")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartes ? cartes.map((item) => (
                        <tr key={item.id}>
                          <td className="text-bold-500">{item.numSérie}</td>
                          <td>
                            <span className={item.statuscarte === "NONUTILISER" ? "badge bg-success" : "badge bg-danger"}>{item.statuscarte}</span>
                          </td>
                          <td>{item.valeur}</td>
                          <td>
                            <i
                              className="fa-solid fa-trash deleteIcon"
                              onClick={() => handleDelete(item.id)}
                            ></i>
                          </td>
                        </tr>
                      )) : <tr><td colSpan="4">loading</td></tr>}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Recharges;
