import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import Cookies from 'js-cookie'
const DemandeProduitAdmin = () => {
  const token = Cookies.get('token')
  const state = useContext(GlobalState);
  const demandes = state.demandes
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [starClicked, setStarClicked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [label, setLabel] = useState("");
  const [image, setImage] = useState(null);
  const [initialStock, setInitialStock] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [description, setDescription] = useState("");
  const [category , setCategory] = useState();
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleValidation = (action , status , id) => {
    console.log(action , status , id)
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui"),
      cancelButtonText: t("Non, annuler !"),
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then(async(result) => {
      if (result.isConfirmed) {
        if (action === "valider") {
          await traiterDemandeCategory(id , status);
          Swal.fire({
            title: "Valider",
            text: "Votre élément est validé :)",
            icon: "success",
            confirmButtonColor: "#F9B853",
          });
        } else {
          Swal.fire({
            title: "Refuser",
            text: "Votre élément est refusé :)",
            icon: "error",
            confirmButtonColor: "#F9B853",
          });
        }
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
const traiterDemandeCategory = async(demandeId , status)=>{
  try {
    console.log(token , demandeId ,status )
    const res = await axios.post(`http://192.168.0.118:8081/api/demandes/traiterDemandeModificationCategorie?demandeId=${demandeId}&statusDemande=${status}`,{}, {headers : {Authorization: `Bearer ${token}`}})
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}
 
  const showModal = (item) =>{
    setShowEditModal(true);
    console.log(item)
    setCategory(item)
  }




  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="content-container">
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h2 className="new-price">{t("Demande Categorie")}</h2>
          </div>
          <div className="card-body">
            {isMobile ? (
              <Table responsive="sm">
                <tbody>
                  {demandes&& demandes.map((item)=>(
                    <>
                      <tr>
                    <td>{t("Admin")}</td>
                    <td>
                    <h6>{item.administrateur.identifiant}</h6>
                    </td>
                    </tr>
                   
                    <tr>
                        <td>{t("type demande ")}</td>
                        <td>{item.typeDemandeAdmin}</td>
                    </tr>
                  <tr>
                    <td>{t("Ancien categorie")}</td>
                    <td>
                      <button onClick={()=>showModal(item.oldCategorie)} class="btn btn-primary">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Nouveau categorie")}</td>
                    <td>
                      <button onClick={()=>showModal(item.newCategorie)} class="btn btn-primary">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Statut")}</td>
                    <td>
                      <button className="btn btn-secondary">
                      {item.status}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Valider")}</td>
                    <td>
                      {item.status==="EN_ATTENTE"?(
 <i
 className="fa-solid fa-circle-check text-success"
 onClick={() => handleValidation("valider" , "APPROUVER" , item.id)}
></i>
                      ):(
                        <h6>-</h6>
                      )}
                     
                    </td>
                  </tr>
                  <tr>
                    <td>{t("Refuser")}</td>
                    <td>
                      {item.status==="EN_ATTENTE"?(
                        <i
                        className="fa-solid fa-circle-xmark text-danger"
                        onClick={() => handleValidation("refuser" , "REFUSER", item.id)}
                      ></i>
                      ):(
                        <h6>-</h6>
                      )}
                      
                    </td>
                  </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Table responsive="sm">
                <thead>
                  <tr>
                  <th>{t("Admin")}</th>
                  
                  <th>{t("type demande")}</th>
                    <th>{t("Ancien categorie")}</th>
                    <th>{t("Nouveau categorie")}</th>
                    <th>{t("Statut")}</th>
                    <th>{t("Action")}</th>
                    <th>{t("Valider")}</th>
                    <th>{t("Refuser")}</th>
                  </tr>
                </thead>
                <tbody>
                  {demandes && demandes.map((item)=>(
                    <tr>
                  <td>
                      <h6>{item.administrateur.identifiant}</h6>
                    </td>
                   
                    <td>{item.typeDemandeAdmin}</td>
                    <td>
                      <button onClick={()=>showModal(item.oldCategorie)}  class="btn btn-primary">View</button>
                    </td>
                    <td>
                      <button onClick={()=>showModal(item.newCategorie)}  class="btn btn-primary">View</button>
                    </td>
                    <td>
                      <button className="btn btn-secondary">
                        {item.status}
                      </button>
                    </td>
                    <td>{item.action}</td>
                    <td>
                      {item.status==="EN_ATTENTE"?(
                        <i
                        className="fa-solid fa-circle-check text-success"
                        onClick={() => handleValidation("valider" , "APPROUVER" , item.id)}
                      ></i>
                      ):(
                        <h6>-</h6>
                      )}
                      
                    </td>
                    <td>
                      {item.status==="EN_ATTENTE"?(
                        <i
                        className="fa-solid fa-circle-xmark text-danger"
                        onClick={() => handleValidation("valider" , "REFUSER", item.id)}
                      ></i>
                      ):(
                        <h6>-</h6>
                      )}
                      
                    </td>
                  </tr>
                  ))}
                  
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </section>

      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Categorie")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form form-vertical" >
            <div className="form-body">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="label">{t("Libellé")}</label>
                    <input
                      type="text"
                      className="form-control"
                      id="label"
                      maxLength="25"
                      value={category?category.nomCategorie:""}
                      
                      disabled
                    />
                  </div>
                </div>
                {/* <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="image">{t("Image")}</label>
                   <img src={""}/>
                  </div>
                </div> */}
                
                {/* <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    {t("Sauvegarder")}
                  </button>
                </div> */}
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DemandeProduitAdmin;
