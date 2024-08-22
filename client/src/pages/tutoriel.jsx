import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie'
const Modal = ({ t, handleImageChange, tuto, setTuto, addTuto }) => {
  return (
    <div
      className="modal fade text-left"
      id="inlineForm"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel33"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel33">{t("Ajouter une nouvelle image")}</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={addTuto} action="#">
            <div className="modal-body">
              <label htmlFor="email">{t("Image")}</label>
              <div className="form-group">
                <input
                  id="email"
                  type="file"
                  placeholder={t("Écrivez ici")}
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>
              <label htmlFor="ordre">{t("Ordre")}</label>
              <div className="form-group">
                <input
                  id="ordre"
                  type="number"
                  placeholder={t("Écrivez ici")}
                  className="form-control"
                  onChange={(e) => setTuto({ ...tuto, ordre: e.target.value })}
                />
              </div>
              <label htmlFor="description">{t("Description")}</label>
              <div className="form-group">
                <textarea
                  id="description"
                  type="text"
                  placeholder={t("Écrivez ici")}
                  className="form-control"
                  onChange={(e) => setTuto({ ...tuto, description: e.target.value })}
                />
              </div>
              <label htmlFor="description">{t("Description(arabe)")}</label>
              <div className="form-group">
                <textarea
                  id="descriptionAr"
                  type="text"
                  placeholder={t("Écrivez ici")}
                  className="form-control"
                  onChange={(e) => setTuto({ ...tuto, descriptionAr: e.target.value })}
                />
              </div>
              <label htmlFor="description">{t("Description(englais)")}</label>
              <div className="form-group">
                <textarea
                  id="descriptionEn"
                  type="text"
                  placeholder={t("Écrivez ici")}
                  className="form-control"
                  onChange={(e) => setTuto({ ...tuto, descriptionEn: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                <i className="bx bx-x d-block d-sm-none"></i>
                <span className="btn btn-secondary">{t("Annuler")}</span>
              </button>
              <button className="btn btn-primary" data-bs-dismiss="modal" type="submit">
                <i className="bx bx-check d-block d-sm-none"></i>
                <span className="btn btn-primary">{t("Enregistrer")}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ item, handleDelete }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td className="text-bold-500">
        <img className="imgtable" src={item.file} alt="tuto_image" style={{ width: "auto", height: "150px" }} />
      </td>
      <td>{item.ordre}</td>
      <td>
        <i className="fa-solid fa-trash deleteIcon" onClick={() => handleDelete(item.id)}></i>
      </td>
    </tr>
  );
};

const ResponsiveTable = ({ tutorials, handleDelete, isMobile }) => {
  const { t } = useTranslation();

  return (
    <div className="table-responsive">
      {isMobile ? (
        <table className="table">
          <tbody>
           {tutorials && tutorials.map((item)=>(
            <>
             <tr>
            <td>{t("Image")}</td>
            <td> <img className="imgtable" src={item.file} alt="tuto_image" style={{ width: "auto", height: "150px" }} /></td>
            </tr>
            <tr>
            <td>{t("Ordre")}</td>
            <td>{item.ordre}</td>
            </tr>
            <tr>
            <td>{t("Supprimer")}</td>
            <td>  <i className="fa-solid fa-trash deleteIcon" onClick={() => handleDelete(item.id)}></i></td>
            </tr>
            </>
           ))}
          </tbody>
        </table>
      ) : (
      <table className="table table-lg">
        <thead>
          <tr>
            <td>{t("Image")}</td>
            <td>{t("Ordre")}</td>
            <td>{t("Supprimer")}</td>
          </tr>
        </thead>
        <tbody>
          {tutorials ? (
            tutorials.map((item, index) => (
              <TableRow key={index} item={item} handleDelete={handleDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="3">{t("loading")}</td>
            </tr>
          )}
        </tbody>
      </table>
      )}
    </div>
  );
};

const Tutoriel = () => {
  const token = Cookies.get('token')
  const { t } = useTranslation();
  const [tuto, setTuto] = useState({ ordre: 0, description: "",descriptionAr:"" ,descriptionEn:"", file: "" });
  const state = useContext(GlobalState);
  const tutorials = state.tutorials;
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
        });      } else {
          Swal.fire({   title: "Annulé",
            text: "Votre élément est en sécurité :)",
            icon: "error",
            confirmButtonColor: "#b0210e",
          });       }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setTuto({ ...tuto, file: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8081/api/tuto/deleteTuto?id=${id}` , {headers : {Authorization: `Bearer ${token}`}});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTuto = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/tuto/publishNow", tuto , {headers : {Authorization: `Bearer ${token}`}});
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="app">
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
                      <h2 className="new-price">{t("Vous souhaitez ajouter une nouvelle image ?")}</h2>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#inlineForm"
                      >
                        <i className="bi bi-plus"></i>
                        {t("Ajouter")}
                      </button>
                      <Modal
                        t={t}
                        handleImageChange={handleImageChange}
                        tuto={tuto}
                        setTuto={setTuto}
                        addTuto={addTuto}
                      />
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
              <h2 className="new-price">{t("Liste des images")}</h2>
            </div>
            <div className="card-content">
              <div className="card-body">
                <ResponsiveTable
                  tutorials={tutorials}
                  handleDelete={handleDelete}
                  isMobile={isMobile}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tutoriel;
