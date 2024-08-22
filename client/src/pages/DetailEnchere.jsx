import React, { useState, useEffect, useContext } from "react";
import "../css/DetailEnchere.css";
import { Link } from "react-router-dom";
import "../css/DetailEnchere.css";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { Modal, Button, Form } from "react-bootstrap";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import Cookies from "js-cookie"
function DetailEnchere(props) {
  const token = Cookies.get('token')
  const state = useContext(GlobalState);
  const users = state.Users
  const participants = [...props.selectedItem.participantNonSignéIds , ...props.selectedItem.participantSignéIds]
  const filteredUsers = users.filter(user => participants.includes(user.id));
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [additionalTables, setAdditionalTables] = useState([]);
  const [newTableData, setNewTableData] = useState({
    date: "",
    montantPayer: "",
    montantRestant: "",
    montantChaqueMois: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    console.log(participants , filteredUsers)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const deleteItem = () => {
    // Implement your delete logic here
  };


    const approverUser = async(enchereId , userId) =>{
      try {
        const res = await axios.post(`http://localhost:8081/api/bid/approve/${enchereId}/${userId}`, {} , {headers:{Authorization: `Bearer ${token}`}})
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }




  const handleAddTable = () => {
    setAdditionalTables([
      ...additionalTables,
      {
        id: additionalTables.length + 1,
        data: [
          { label: t("Date de paiement"), value: newTableData.date },
          { label: t("Montant à payer"), value: newTableData.montantPayer },
          { label: t("Montant restant"), value: newTableData.montantRestant },
          {
            label: t("Montant à payer chaque mois"),
            value: newTableData.montantChaqueMois,
          },
        ],
      },
    ]);
    setShowModal(false);
    setNewTableData({
      date: "",
      montantPayer: "",
      montantRestant: "",
      montantChaqueMois: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTableData({ ...newTableData, [name]: value });
  };

  const handleDelete = () => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      text: t(
        "Une fois supprimé(e), vous ne pourrez pas récupérer cet élément !"
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, supprimez-le !"),
      cancelButtonText: t("Non, annuler !"),
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
        Swal.fire(
          t("Supprimé(e) !"),
          t("Votre élément a été supprimé."),
          "secondary"
        );
      } else {
        Swal.fire(t("Annulé"), t("Votre élément est en sécurité :)"), "error");
      }
    });
  };

  useEffect(() => {
    const imgs = document.querySelectorAll(".img-select a");
    const imgBtns = [...imgs];
    let imgId = 1;

    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
      });
    });

    function slideImage() {
      const displayWidth = document.querySelector(
        ".img-showcase img:first-child"
      )?.clientWidth;

      if (displayWidth) {
        document.querySelector(".img-showcase").style.transform = `translateX(${
          -(imgId - 1) * displayWidth
        }px)`;
      }
    }

    window.addEventListener("resize", slideImage);

    // Cleanup function
    return () => {
      imgBtns.forEach((imgItem) => {
        imgItem.removeEventListener("click", slideImage);
      });
      window.removeEventListener("resize", slideImage);
    };
  }, []);


  const [mainImage, setMainImage] = useState(props.selectedItem.galerie[0]);

  return (
    <div className="content-container">
      <div id="main">
        <section className="section">
          <div className="card-wrap">
            <div className="card">
              <div className="product-detail">
                <div className="product-images">
                  <div className="main-image">
                    <img src={mainImage} alt="Product" />
                  </div>
                  <div className="thumbnail-images">
                    {props.selectedItem.galerie.map((image, index) => (
                      <img
                        key={image}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => setMainImage(image)}
                      />
                    ))}
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-price">
                    <div className="col-md-12  mb-4">
                      <div
                        style={{
                          margin: 0,
                          backgroundColor: "white",
                          justifyContent: "center",
                          padding: 20,
                        }}
                        className="row form-group"
                      >
                        <h2 className="new-price">{t("Etat")} :</h2>
                        {props.selectedItem.status==="En_Cours" ?(
                            <div className="col-12">
                            <p>{t("En cours")} : </p>
                            <p>{t("Prix Mazed online")} :{props.selectedItem.prixMazedOnline}DT</p>
                            <p>{t("Temps restant")}</p>
                            <p>{t("Majoration")}:{props.selectedItem.valeurMajoration.map((item)=>item + "/")}DT </p>
                            {/* <p>{t("Prix lors de la majoration")}</p> */}
                          </div>
                        ):(
                          <div className="col-12">
                          <p>{t("Terminer")}</p>
                          <p>{t("Prix Mazed online final")}</p>
                          <p>{t("Date/Heure")}</p>
                          <p>{t("Nom et Prénom")}</p>
                          <p>{t("Pseudo")}</p>
                          <p>{t("Numéro du téléphone")}</p>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            {t("Publier")}
                          </button>
                        </div>
                        )}
                      
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className="product-price">
                <br />
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />
        <section className="section">
          <div className="card">
            <div className="card-header">
              <h2 className="new-price">{t("Liste des participants")}</h2>
            </div>
            <div className="card-body">
              <div className="table-responsive datatable-minimal">
                {isMobile ? (
                  <table className="table" id="table2">
                    <tbody>
                      {filteredUsers && filteredUsers.map((item=>(
                        <>
                        <tr>
                        <td>{t("Nom de famille")}</td>
                        <td>Thamer</td>
                      </tr>
                      <tr>
                        <td>{t("Prénom")}</td>
                        <td>Seif</td>
                      </tr>
                      <tr>
                        <td>{t("Pseudo")}</td>
                        <td>Clubisty</td>
                      </tr>
                      <tr>
                        <td>{t("Numéro du téléphone")}</td>
                        <td>(+1) 613 820 8838</td>
                      </tr>
                     
                      <tr>
                        <td>{t("Nombre d'encheres y liées")}</td>
                        <td>69</td>
                      </tr>
                      <tr>
                        <td>{t("Lien Page Details")}</td>
                        <td>Lien</td>
                      </tr>
                        </>
                      )))}
                      
                    </tbody>
                  </table>
                ) : (
                  <table className="table" id="table2">
                    <thead>
                      <tr>
                        <th>{t("Nom de famille")}</th>
                        <th>{t("Prénom")}</th>
                        <th>{t("Pseudo")}</th>
                        <th>{t("Numéro du téléphone")}</th>
                        <th>{t("Nombre d'encheres y liées")}</th>
                        <th>{t("Détail")}</th>
                        <th>{t("approuver")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers && filteredUsers.map((item)=>(
                        <tr>
                          <td>{item.nomFamille}</td>
                          <td>{item.prenom}</td>
                          <td>{item.pseudo}</td>
                          <td>{item.numTel}</td>
                          <td>{item.mesEnchere?.length}</td>
                          <td>
                            <i className="fa-solid fa-eye font-medium-1"></i>
                          </td>
                          {!props.selectedItem.participantSignéIds.includes(item.id)?(
                            <td>
                            <i onClick={()=>approverUser(props.selectedItem.id,item.id)} className="fa-solid fa-check font-medium-1"></i>
                          </td>
                          ):(<td>-</td>)}
                          
                        </tr>
                      ))}
                     
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>
        <br />
        <br />

        <section className="section">
          <div className="card">
            <div className="card-header">
              <h2 className="new-price">{t("Liste des Enchèrissement")}</h2>
            </div>
            <div className="card-body">
              <div className="table-responsive datatable-minimal">
                {isMobile ? (
                  <table className="table" id="table2">
                    <tbody>
                      <tr>
                        <td>{t("User")}</td>
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
                        <td>Seif</td>
                      </tr>
                      <tr>
                        <td>{t("Prénom")}</td>
                        <td>Seif</td>
                      </tr>
                      <tr>
                        <td>{t("Pseudo")}</td>
                        <td>Clubisty</td>
                      </tr>
                      <tr>
                        <td>{t("Heure de majoration")}</td>
                        <td>Date Here</td>
                      </tr>
                      <tr>
                        <td>{t("Valeur Majoration")}</td>
                        <td>04/07/2026</td>
                      </tr>
                      <tr>
                        <td>{t("Montant total")}</td>
                        <td>69</td>
                      </tr>
                      <tr>
                        <td>{t("Gagant")}</td>
                        <td>
                          <i className="fa-solid fa-trophy"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table className="table" id="table2">
                    <thead>
                      <tr>
                        <th>{t("User")}</th>
                        <th>{t("Nom")}</th>
                        <th>{t("Prénom")}</th>
                        <th>{t("Pseudo")}</th>
                        <th>{t("Heure de majoration")}</th>
                        <th>{t("Valeur Majoration")}</th>
                        <th>{t("Montant total")}</th>
                        <th>{t("Gagant")}</th>
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
                        <td>Seif</td>
                        <td>Seif</td>
                        <td>Clubisty</td>
                        <td>Date Here</td>
                        <td>04/07/2026</td>
                        <td>69</td>
                        <td>
                            <i className="fa-solid fa-trophy" onClick={() => setShowModal(true)}
                            ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
       {/* Modal */}
       <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Ajouter Echéance")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>{t("Date de paiement")}</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newTableData.date}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("Montant à payer")}</Form.Label>
              <Form.Control
                type="text"
                name="montantPayer"
                value={newTableData.montantPayer}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("Montant restant")}</Form.Label>
              <Form.Control
                type="text"
                name="montantRestant"
                value={newTableData.montantRestant}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("Montant à payer chaque mois")}</Form.Label>
              <Form.Control
                type="text"
                name="montantChaqueMois"
                value={newTableData.montantChaqueMois}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t("Type de payement")}</Form.Label>
              <Form.Control
                as="select"
                name="selectedOption"
                value={newTableData.selectedOption}
                onChange={handleInputChange}
              >
                <option value="">{t("Type de payement")}</option>
                <option value="option1">{t("Option 1")}</option>
                <option value="option2">{t("Option 2")}</option>
                <option value="option3">{t("Option 3")}</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("Annuler")}
          </Button>
          <Button variant="primary" onClick={handleAddTable}>
            {t("Ajouter")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DetailEnchere;
