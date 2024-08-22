import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GlobalState } from "../GlobalState";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie"
function CategoryList() {
  const token = Cookies.get('token')
  const { t , i18n } = useTranslation();
  const state = useContext(GlobalState);
  const categories = state.Categories;
  const user = state.Me
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setcategory] = useState({nomCategorieArabe:"" ,nomCategorieEnglish:"",nomCategorie:"" , icon:"" , id : "" , alUne:"" , statusCategorie:""});
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setcategory({ ...category, icon: reader.result });
    };

    reader.readAsDataURL(file);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(()=>{

  },[i18n.language])
  const getCategoryName = (cat) => {
    switch (i18n.language) {
      case 'ar':
        return cat.nomCategorieArabe || '';
      case 'en':
        return cat.nomCategorieEnglish || '';
      case 'fr':
      default:
        return cat.nomCategorie || '';
    }
  };

  const handleDeleteModal = (catId) => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        deleteC(catId);
        Swal.fire({
          text: "Supprimé(e) ! Votre élément a été supprimé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
      } else {
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
      }
    });
  };
const deleteC = async(id) =>{
  try {
    const res = await axios.delete(`http://localhost:8081/api/categories/${id}` ,{headers : {Authorization: `Bearer ${token}`} });
    console.log(res.data);
  } catch (error) {
    console.log(error)
  }
}
  const handleBanModal = (catId) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, désactivez-le !"),
      cancelButtonText: t("Non, annuler !"),
    }).then(async(result) => {
      if (result.isConfirmed) {
        await banC(catId);
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
      } else {
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
      }
    });
  };
  const handleunBanModal = (catId) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, désactivez-le !"),
      cancelButtonText: t("Non, annuler !"),
    }).then(async(result) => {
      if (result.isConfirmed) {
        await unbanC(catId);
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
      } else {
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
      }
    });
  };
  const handlealuneModal = (catId) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, désactivez-le !"),
      cancelButtonText: t("Non, annuler !"),
    }).then(async(result) => {
      if (result.isConfirmed) {
        await alune(catId);
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
      } else {
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
      }
    });
  };
  const handlealuneFalseModal = (catId) => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui, désactivez-le !"),
      cancelButtonText: t("Non, annuler !"),
    }).then(async(result) => {
      if (result.isConfirmed) {
        await aluneFalse(catId);
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Désactivé(e) ! Votre élément a été désactivé.",
          icon: "success",
          confirmButtonColor: "#b0210e",
        });
      } else {
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
        Swal.fire({
          text: "Annulé, Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });
      }
    });
  };
  const banC = async(id) =>{
    if (user.roleAdmin.name === "Super admin") {
      try {
        const res = await axios.patch(`http://localhost:8081/api/categories/${id}/deactivate` ,{},{headers : {Authorization: `Bearer ${token}`} });
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        const res = await axios.post(`http://localhost:8081/api/demandes/changerStatutCategorie?categoryId=${id}&newStatus=DESACTIVER` ,{},{headers : {Authorization: `Bearer ${token}`} });
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    }
   
  }

  const unbanC = async(id) =>{
    if (user.roleAdmin.name === "Super admin") {
      try {
        const res = await axios.patch(`http://localhost:8081/api/categories/${id}/activate` ,{},{headers : {Authorization: `Bearer ${token}`} });
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    }else{
      try {
        const res = await axios.post(`http://localhost:8081/api/demandes/changerStatutCategorie?categoryId=${id}&newStatus=ACTIVER` ,{},{headers : {Authorization: `Bearer ${token}`} });
        console.log(res.data);
      } catch (error) {
        console.log(error)
      }
    }
   
  }
 
const alune = async(id)=>{
  try {
    console.log("done")
    const res = await axios.patch(`http://localhost:8081/api/categories/${id}/set-al-une?alUne=true` ,{headers : {Authorization: `Bearer ${token}`} });
    console.log(res.data);
    console.log("done true")
  } catch (error) {
    console.log(error)
  }
}
const aluneFalse = async(id)=>{
  try {
    const res = await axios.patch(`http://localhost:8081/api/categories/${id}/set-al-une?alUne=false` ,{headers : {Authorization: `Bearer ${token}`} });
    console.log(res.data);
    console.log("done false")
  } catch (error) {
    console.log(error)
  }
}
const updateCat = async (id, e) => {
  e.preventDefault();
  
  if (user.roleAdmin.name === "Super admin") {
    try {
      const res = await axios.put(
        `http://localhost:8081/api/categories/${id}`, 
        category, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  } else {
    try {
      console.log(category)
      const res = await axios.post(
        `http://localhost:8081/api/demandes/createModificationCategoryRequest`, 
        category, 
        { 
          params: { oldCategoryId: id },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error creating modification request:", error);
    }
  }
};





  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setcategory({...category , nomCategorie:cat.nomCategorie , icon:cat.icon , id:cat.id , alUne:cat.alUne , statusCategorie:cat.statusCategorie , nomCategorieArabe:cat.nomCategorieArabe , nomCategorieEnglish:cat.nomCategorieEnglish})
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const handleModalSave = () => {
    // Implement save logic for edited category
    setShowModal(false);
  };

  const renderMobileTable = () => (
    <table className="table" style={{ width: "100%", textAlign: "center" }}>
      <tbody>
        {categories ? (
          categories.map((cat, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{t("Libellé")}</td>
                <td>{getCategoryName(cat)}</td>
              </tr>
              <tr>
                <td>{t("status")}</td>
                <td>{t(cat.statusCategorie)}</td>
              </tr>
              <tr>
                <td>{t("Modifier")}</td>
                <td>
                  <button className="btn" onClick={() => handleEdit(cat)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>{t("Désactiver")}</td>
                <td>
                  <i className="fa-solid fa-ban" onClick={() => handleBanModal(cat.id)}></i>
                </td>
              </tr>
              <tr>
                <td>{t("Activer")}</td>
                <td>
                  <i className="fa-solid fa-check" onClick={() => handleunBanModal(cat.id)}></i>
                </td>
              </tr>
              <tr>
                <td>{t("Supprimer")}</td>
                <td>
                  <i
                    className="fa-solid fa-trash deleteIcon"
                    onClick={() => handleDeleteModal(cat.id)}
                  ></i>
                </td>
              </tr>
              <tr>
                <td>{t("Mettre a l'une")}</td>
                <td>
                  {cat.alUne  ? (
                    <i
                      className="fa-solid fa-star arrowIcon"
                      onClick={() => handlealuneFalseModal(cat.id)}
                    ></i>
                  ) : (
                    <i
                      className="fa-regular fa-star arrowIcon"
                      onClick={() => handlealuneModal(cat.id)}
                    ></i>
                  )}
                </td>
              </tr>
              <tr>
                <td colSpan="2"><hr /></td>
              </tr>
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td colSpan="2">Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const renderDesktopTable = () => (
    <table className="table">
      <thead>
        <tr>
          <th>{t("Libellé")}</th>
          <td>{t("status")}</td>
          <th>{t("Modifier")}</th>
          <th>{t("Désactiver")}</th>
          <th>{t("Activer")}</th>
          <th>{t("Supprimer")}</th>
          <th>{t("Mettre a l'une")}</th>
        </tr>
      </thead>
      <tbody>
        {categories ? (
          categories.map((cat, index) => (
            <tr key={index}>
              <td className="text-bold-500">{getCategoryName(cat)}</td>
              <td>{t(cat.statusCategorie)}</td>
              <td>
                <button className="btn" onClick={() => handleEdit(cat)}>
                <button className="btn" onClick={() => handleEdit(cat)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                </button>
              </td>
              <td>
                <i className="fa-solid fa-ban" onClick={() => handleBanModal(cat.id)}></i>
              </td>
              <td>
                <i className="fa-solid fa-check" onClick={()=>{handleunBanModal(cat.id)}}></i>
              </td>
              <td>
                <i
                  className="fa-solid fa-trash deleteIcon"
                  onClick={() => handleDeleteModal(cat.id)}
                ></i>
              </td>
              <td>
                {cat.alUne ? (
                  <i
                    className="fa-solid fa-star arrowIcon"
                    onClick={() => handlealuneFalseModal(cat.id)}
                  ></i>
                ) : (
                  <i
                    className="fa-regular fa-star arrowIcon"
                    onClick={() => handlealuneModal(cat.id)}
                  ></i>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>
        <section className="section">
          <div className="row" id="table-head">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h2 className="new-price">{t("Liste de catégories")}</h2>
                </div>
                <div className="card-content">
                  <div className="row" style={{ padding: "0 20px" }}>
                  
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {isMobile ? renderMobileTable() : renderDesktopTable()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("Modifier la catégorie")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form or content for editing category */}
          {selectedCategory && (
            <div className="card-content">
            <div className="card-body">
              <form onSubmit={e=>updateCat(selectedCategory.id , e)} className="form form-vertical">
                <div className="form-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="email-id-icon">{t("Libellé")}</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email-id-icon"
                          onChange={e=>setcategory({...category , nomCategorie:e.target.value})}
                          value={category.nomCategorie}
                        />
                      </div>
                      
                        <label htmlFor="email-id-icon">{t("Libellé(arabe)")}</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email-id-icon"
                          onChange={e=>setcategory({...category , nomCategorieArabe:e.target.value})}
                          value={category.nomCategorieArabe}
                        />
                      
                      
                        <label htmlFor="email-id-icon">{t("Libellé(english)")}</label>
                        <input
                          type="text"
                          className="form-control"
                          id="email-id-icon"
                          onChange={e=>setcategory({...category , nomCategorieEnglish:e.target.value})}
                          value={category.nomCategorieEnglish}
                        />
                        <input
                          type="file"
                          className="form-control"
                          id="email-id-icon"
                          onChange={handleImageChange}
                        
                        />
                    </div>
                   
                  </div>
                </div>
                <Button variant="secondary" onClick={handleModalClose}>
            {t("Fermer")}
          </Button>
          <Button variant="primary" type="submit">
            {t("Enregistrer")}
          </Button>
              </form>
            </div>
          </div>
          )}
          
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryList;
