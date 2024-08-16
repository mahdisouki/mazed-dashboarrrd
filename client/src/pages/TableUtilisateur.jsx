import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../GlobalState";
import { Modal, Button, Table, Form } from "react-bootstrap";

import axios from "axios";
import Cookies from 'js-cookie'
function TableUtilisateur() {
  const token = Cookies.get('token');
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
 
  const [isMobile, setIsMobile] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalType, setModalType] = useState('');
  const state = useContext(GlobalState);
  const users = state.Users
  const [updateItem , setUpdateItem] = useState({nomFamille:"",prenom:"",pseudo:"",role:""})
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

  const handleBlockClick = (id) => {
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
        blockItem(id);
        Swal.fire(t("Désactivé(e) !"), t("Votre élément a été désactivé."), "secondary");
      } else {
        Swal.fire(t("Annulé"), t("Votre élément est en sécurité :)"), "error");
      }
    });
  };
  const openModal = (type, item) => {
    setModalType(type);
    setCurrentItem(item);
  };
 const  openSoldeModal = (item) =>{
     setModalShow(true)
    setCurrentItem(item);
  }
  const handleUnblockClick = (id) => {
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
        unblockItem(id);
        Swal.fire(t("Débloqué(e)"), t("Votre élément a été débloqué."), "secondary");
      } else {
        Swal.fire(t("Annulé"), t("Votre élément est en sécurité :)"), "error");
      }
    });
  };

  const deleteItem = () => {
    // Your delete logic here
  };

  const blockItem = async(id) =>{
    
    try {
      const res = await axios.put(`http://localhost:8081/admin/block/${id}` , {headers : {Authorization: `Bearer ${token}`}});
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const unblockItem = async(id) =>{
    try {
      const res = await axios.put(`http://localhost:8081/admin/unblock/${id}` , {headers : {Authorization: `Bearer ${token}`}});
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const updateData = async(id , e) =>{
e.preventDefault();
try {
  const res = await axios.put(`http://localhost:8081/admin/${id}/role/?role=${updateItem.role}` , {headers : {Authorization: `Bearer ${token}`}});
  console.log(res.data)
} catch (error) {
  console.log(error)
}
  }

  return (
    <div className="content-container">
    <div id="main">
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3"></i>
        </a>
      </header>
      <section className="section">
        <div className="card">
          <div className="card-header">
            <h2 className="new-price">{t("Liste des utilisateurs")}</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {isMobile ? (
                <table className="table" id="table1">
                  <tbody>
                    {users && users.map((item)=>(
                      <>
                       <tr>
                      <td>{t("Nom")}</td>
                      <td>{item.prenom}</td>
                    </tr>
                    <tr>
                      <td>{t("Pseudo")}</td>
                      <td>{item.pseudo}</td>
                    </tr>
                    <tr>
                      <td>{t("Email")}</td>
                      <td>{item.email}</td>
                    </tr>
                    <tr>
                      <td>{t("Détail")}</td>
                      <td>
                      <Link
  to={{
    pathname: `/UtilisateurDetails/${item.id}`,
    state: {user: "hello"}
  }}
>
  <i className="fa-solid fa-eye"></i>
</Link>
                      </td>
                    </tr>
                    {/* <tr>
                      <td>{t("Modifier")}</td>
                      <td>
                        <Link to='/UtilisateurEdit'>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </td>
                    </tr> */}
                    <tr>
                      <td>{t("Bloquer")}</td>
                      <td>
                        <i className="fa-solid fa-lock" onClick={()=>handleBlockClick(item.id)}></i>
                      </td>
                    </tr>
                    <tr>
                      <td>{t("Débloquer")}</td>
                      <td>
                        <i className="fa-solid fa-lock-open" onClick={()=>handleUnblockClick(item.id)}></i>
                      </td>
                    </tr>
                      </>
                    ))}
                   
                  
                  </tbody>
                </table>
              ) : (
                <table className="table" id="table1">
                  <thead>
                    <tr>
                      <th>{t("Nom")}</th>
                      <th>{t("Pseudo")}</th>
                      <th>{t("Role")}</th>
                      <th>{t("Détail")}</th>
                      {/* <th>{t("Modifier")}</th> */}
                      <th>{t("Bloquer")}</th>
                      <th>{t("Débloquer")}</th>
                      <th>{t("Solde")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.map((item)=>(
 <tr>
 <td>{item.prenom}</td>
 <td>{item.pseudo}</td>
 <td>{item.email}</td>
 <td>

     <i className="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => openModal('view', item)}></i>
 </td>
 {/* <td>
   
     <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => openModal('edit', item)}></i>
 </td> */}
 <td>
   <i className="fa-solid fa-lock" onClick={()=>handleBlockClick(item.id)}></i>
 </td>
 <td>
   <i className="fa-solid fa-lock-open" onClick={()=>handleUnblockClick(item.id)}></i>
 </td>
 
                      <td>
                        <i
                          className="fa-solid fa-sack-dollar"
                          onClick={() => openSoldeModal(item)}
                        ></i>
                      </td>
</tr>
                    ))}
                   
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
          {/* View Modal */}
          <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel"><h3>{t("Détail d’utilisateur")}</h3></h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="page-content">
          <div className="page-heading">
            <div className="page-title">
              <div className="row">
                <div className="col-12 col-md-6 order-md-1 order-last">
                  
                </div>
                <div className="col-12 col-md-6 order-md-2 order-first"></div>
              </div>
            </div>
            <section className="section">
              <div className="row">
                <div className="col-12">
                  <div className="">
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
                              defaultValue={currentItem?.nomFamille}
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
                              defaultValue={currentItem?.prenom}
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
                              defaultValue={currentItem?.pseudo}
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
                              defaultValue={currentItem?.role}
                              disabled
                            />
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
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  {/* Edit Modal */}
  <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">{t("Editer le terme")}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="page-content">
          <div className="page-heading">
            <div className="page-title">
              <div className="row">
                <div className="col-12 col-md-6 order-md-1 order-last">
                  
                </div>
                <div className="col-12 col-md-6 order-md-2 order-first"></div>
              </div>
            </div>
            <section className="section">
              <div className="row">
                <div className="col-12">
                  <div className="">
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
                        <form onSubmit={updateData}>
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
                              defaultValue={currentItem?.nomFamille}
                              onChange={e=>setUpdateItem({...updateItem , nomFamille:e.target.value})}
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
                              defaultValue={currentItem?.prenom}
                              onChange={e=>setUpdateItem({...updateItem , prenom:e.target.value})}

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
                              defaultValue={currentItem?.pseudo}
                              onChange={e=>setUpdateItem({...updateItem , pseudo:e.target.value})}

                            />
                          </div>
                          <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="role">{t("Role")}</label>
                          <fieldset className="form-group mb-3">
                            <select defaultValue={currentItem?.role}  onChange={e=>setUpdateItem({...updateItem , role:e.target.value})} className="form-select" id="role">
                              <option value={"Acheteur"}>{t("Acheteur")}</option>
                              <option value={"Vendeur"}>{t("Vendeur")}</option>
                             
                            </select>
                          </fieldset>
                        </div>
                      </div>
                          <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t("Annuler")}</button>
              <button type="submit" className="btn btn-primary" id="suivantBtn">{t("Enregistrer")}</button>
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
        </div>
      </div>
      <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("Ajouter Montant")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t("Montant")}</Form.Label>
              <Form.Control type="number" placeholder={t("Entrez le montant")} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{t("Manière de recharge")}</Form.Label>
              <Form.Select>
                <option>{t("Virement bancaire")}</option>
                <option>{t("Chèque")}</option>
                <option>{t("Transfert du solde")}</option>
                <option>{t("Visite Bureau Mazed")}</option>
                <option>{t("Carte de recharge")}</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              {t("Ajouter")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TableUtilisateur;
