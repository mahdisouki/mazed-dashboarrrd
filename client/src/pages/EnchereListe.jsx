import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { Table } from "react-bootstrap";
import { GlobalState } from "../GlobalState";
import "../css/DetailEnchere.css";
import "../css/DetailEnchere.css";
import { Modal, Button, Form } from "react-bootstrap";
import DetailEnchere from "./DetailEnchere";
import axios from "axios";
import EnchèreEdit from "./EnchèreEdit";
import Cookies from 'js-cookie'
import Configuration from "./configuration";
function EnchereListe() {
  const token = Cookies.get('token')
  const { t , i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [steps , setSteps] = useState(0)
  const [selectedItem , setSelectedItem] = useState();
  const state = useContext(GlobalState);
  const encheres = state.Bids
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
  useEffect(()=>{

  },[i18n.language])
  const getEnchereName = (cat) => {
    switch (i18n.language) {
      case 'ar':
        return cat.nomProduitAr || '';
      case 'en':
        return cat.nomProduitEn || '';
      case 'fr':
      default:
        return cat.nomProduit || '';
    }
  };
  const deleteItem = async(id) => {
    try {
      const res = await axios.delete(`http://localhost:8081/api/bid/${id}` , {headers : {Authorization: `Bearer ${token}`}});
      console.log(res.data);
    } catch (error) {
      console.log(error)
    }
  };

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
        });      }
    });
  };



  const [showModal, setShowModal] = useState(false);
  const [additionalTables, setAdditionalTables] = useState([]);
  const [newTableData, setNewTableData] = useState({
    date: "",
    montantPayer: "",
    montantRestant: "",
    montantChaqueMois: "",
  });

 



 

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

  const product = {
    title: "Sample Product",
    description:
      "This is a sample product description. It provides details about the product features and benefits.",
    price: 99.99,
    stock: 20,
    images: [
      "https://via.placeholder.com/600x400",
      "https://via.placeholder.com/600x400/ff7f7f",
      "https://via.placeholder.com/600x400/7f7fff",
      "https://via.placeholder.com/600x400/7fff7f",
    ],
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  const confirmAction = (actionType) => {
    Swal.fire({
      title: t("Êtes-vous sûr?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b0210e",
      confirmButtonText: t("Oui"),
      cancelButtonText: t("Non, annuler!"),
    }).then((result) => {
      if (result.isConfirmed) {
        let message;
        switch (actionType) {
          case "Désactiver":
            message = t("L'élément a été désactivé");
            break;
          case "Supprimé":
            message = t("L'élément a été supprimé");
            break;
          case "Terminé":
            message = t("L'élément a été ajouté");
            break;
          default:
            message = t("Action terminée");
        }
        Swal.fire(
          t(actionType.charAt(0).toUpperCase() + actionType.slice(1)),
          message,
          "success"
        );
      }
    });
  };

  return (
    <>
    {steps===0 && (
 <div className="content-container">
 <div id="main">
   <header className="mb-3">
     <a href="#" className="burger-btn d-block d-xl-none">
       <i className="bi bi-justify fs-3" />
     </a>
   </header>
   <section className="section">
     <div className="card">
       <div style={{ display: "flex", justifyContent: "space-between" }} className="card-header">
         <h2 className="new-price">{t("Liste d'enchére")}</h2>
       </div>
       <div className="card-body">
         <div className="row ">
           <div className="col-6 form-group">
             <h6>{t("Catégories")}</h6>
             <select className="choices form-select">
               <option value="square">Square</option>
               <option value="rectangle">Rectangle</option>
               <option value="rombo">Rombo</option>
               <option value="romboid">Romboid</option>
               <option value="trapeze">Trapeze</option>
               <option value="traible">Triangle</option>
               <option value="polygon">Polygon</option>
             </select>
           </div>
           <div className="col-6 form-group">
             <h6 htmlFor="basicInput">{t("Statut")}</h6>
             <select className="choices form-select">
               <option value="square">Square</option>
               <option value="rectangle">Rectangle</option>
             </select>
           </div>
         </div>
         {isMobile ? (
           <Table responsive="sm">
             <tbody>
               {encheres && encheres.map((item)=>(
                 <>
                 <tr>
                 <td>{t("Produit")}</td>
                 <td className="text-bold-500">{getEnchereName(item)}</td>
               </tr>
               <tr>
                 <td>{t("Prix")}</td>
                 <td>{item.prixMazedOnline}</td>
               </tr>
               <tr>
                 <td>{t("Nb de Participant")}</td>
                 <td className="text-bold-500">{item.nombreParticipantréel}</td>
               </tr>
               <tr>
                 <td>{t("Date de Publication")}</td>
                 <td className="text-bold-500">{item.createdAt.split('T')[0]}</td>
               </tr>
               <tr>
                 <td>{t("Date de Déclenchement")}</td>
                 <td>{item.datedeclenchement}</td>
               </tr>
               <tr>
                 <td>{t("Statut")}</td>
                 <td>
                 <a
                       href="#"
                       className={
                         item.status === "Brouillon"
                           ? "btn btn-secondary"
                           : item.status === "Ouverte"
                             ? "btn btn-success"
                             : item.status == "En_Cours"
                             ?"btn btn-primary":"btn btn-dark"
                       }
                     >
                       {t(item.status)}
                     </a>
                 </td>
               </tr>
               <tr>
                 <td>{t("Configuration")}</td>
                 <td>
                   <div className="buttons">
                     <Link to="/configuration" className="btn">
                       <i className="fas fa-cog"></i>
                     </Link>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>{t("Voir")}</td>
                 <td>
                   <div className="buttons">
                   <a onClick={()=>{setSelectedItem(item);setSteps(1)}} className="btn">
                       <i className="fa-solid fa-eye"></i>
                     </a>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>{t("Modifier")}</td>
                 <td>
                   <div className="buttons">
                     <a onClick={()=>{localStorage.setItem("idEnchereConf" , item.id);setSteps(3)}} className="btn">
                       <i className="fa-solid fa-pen-to-square"></i>
                     </a>
                   </div>
                 </td>
               </tr>
               <tr>
                 <td>{t("Supprimer")}</td>
                 <td>
                   <div className="buttons">
                     <a className="btn">
                       <i onClick={()=>handleDelete(item.id)} className="fa-solid fa-trash"></i>
                     </a>
                   </div>
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
                 <th>{t("Produit")}</th>
                 <th>{t("Prix")}</th>
                 <th>{t("Nb de Participant")}</th>
                 <th>{t("Date de Publication")}</th>
                 <th>{t("Date de Déclenchement")}</th>
                 <th>{t("Statut")}</th>
                 <th>{t("Configuration")}</th>
                 <th>{t("Voir")}</th>
                 <th>{t("Modifier")}</th>
                 <th>{t("Supprimer")}</th>
               </tr>
             </thead>
             <tbody>
               {encheres && encheres.map((item)=>(
                   <tr>
                   <td className="text-bold-500">{getEnchereName(item)}</td>
                   <td>{item.prixMazedOnline}</td>
                   <td className="text-bold-500">{item.nombreParticipantréel}</td>
                   <td className="text-bold-500">{item.createdAt.split('T')[0]}</td>
                   <td>{item.datedeclenchement}</td>
                   <td>
                     <a
                       href="#"
                       className={
                         item.status === "Brouillon"
                           ? "btn btn-secondary"
                           : item.status === "Ouverte"
                             ? "btn btn-success"
                             : item.status == "En_Cours"
                             ?"btn btn-primary":"btn btn-dark"
                       }
                     >
                       {t(item.status)}
                     </a>
                   </td>
                   <td>
                    {item.status === "Brouillon"?(
                      <div className="buttons">
                       <a onClick={()=>{localStorage.setItem("idEnchereConf" , item.id);setSteps(3)}}className="btn">
                         <i className="fas fa-cog"></i>
                       </a>
                     </div>
                    ) : ( <i className="fas fa-check"></i>)}
                     
                   </td>
                   <td>
                     <div className="buttons">
                     <a onClick={()=>{setSelectedItem(item);setSteps(1)}} className="btn">
                         <i className="fa-solid fa-eye"></i>
                       </a>
                     </div>
                   </td>
                   <td>
                   <div className="buttons">
                   <a onClick={()=>{setSelectedItem(item);setSteps(2)}} className="btn">
                         <i className="fa-solid fa-pen-to-square"></i>
                       </a>
                     </div>
                   </td>
                   <td>
                     <div className="buttons">
                       <a className="btn">
                         <i onClick={()=>handleDelete(item.id)} className="fa-solid fa-trash"></i>
                       </a>
                     </div>
                   </td>
                 </tr>
               ))}
               
              
             </tbody>
           </Table>
         )}
       </div>
     </div>
   </section>
 </div>
</div>
    )}
   


{steps === 1 && (
  <DetailEnchere selectedItem={selectedItem} />
) }
{steps === 2 && (
  <EnchèreEdit selectedItem={selectedItem}/>
)}
{steps ===3 &&(
  <Configuration selectedItem={selectedItem}/>
)}
</>
  );
}

export default EnchereListe;
