import React, { useState, useEffect } from "react";
import "../css/prod-detail.css";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const DetailDemandeProduit = () => {
  const { t } = useTranslation();
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

  const deleteItem = () => {
    // Implement your delete logic here
  };
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
          case "Valider":
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
    <div className="content-container">
    <div className="product-detail">
      <div className="product-images">
        <div className="main-image">
          <img src={mainImage} alt="Product" />
        </div>
        <div className="thumbnail-images">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>
      <div className="product-info">
        <div className="vendeur-prod">
          <div>
          <img style={{borderRadius:"50px"}} className="imgtable" src="./Mazed.jpg" alt="img" />
          </div>
          <div>
            <span>Nom Vendeur</span>
            <br/>
            <span>Prenon</span>
          </div>
        </div>
        <br/>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>In Stock:</strong> {product.stock}
        </p>
        <div className="product-buttons">
          <button className="btn" onClick={() => confirmAction("Valider")}>
            {t("Valider")}
          </button>
          <button className="btn" onClick={() => confirmAction("Supprimé")}>
            {t("Annuler")}
          </button>
          {/* <Link to="/EnchèreCreation">
            <button className="btn">{t("Ajouter une enchère")}</button>
          </Link> */}
        </div>
      </div>
    </div>
    <section className="section">
    
      </section>
      </div>
    </>
  );
};

export default DetailDemandeProduit;
