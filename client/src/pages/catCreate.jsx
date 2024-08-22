import React, { useContext, useEffect, useState } from "react";
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.css";
import { GlobalState } from "../GlobalState";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Cookies from 'js-cookie'
const CatCreate = () => {
  const token = Cookies.get('token')
  const [isEnabled, setIsEnabled] = useState(false);
  const [category, setcategory] = useState({nomCategorieArabe:"" ,nomCategorieEnglish:"",nomCategorie:"" ,icon:""});
  const [inputs, setInputs] = useState([]);
  const state = useContext(GlobalState);
  const { t } = useTranslation();

  const goBack = () => {
    window.history.back(); // Simulate a browser back button
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setcategory({ ...category, icon: reader.result });
    };

    reader.readAsDataURL(file);
  };
  

  const submitCat = async (e) => {
    e.preventDefault();
    console.log(category)
    try {
      const res = await axios.post(
        "http://localhost:8081/api/categories/addCategorie",
        category, // Send the data as a JSON object
       
    
            {headers : {Authorization: `Bearer ${token}`}}  // Set the content type to application/json
      );     console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="content-container">
      <form onSubmit={submitCat} className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="card-title">{t("Créer une catégorie")}</h2>
         
        </div>
        <div className="card-body">
          <div className="row">
            <div  className="col-md-12">
              <div className="form-group">
                <label htmlFor="basicInput">{t("Libellé")}</label>
                <input
                  onChange={(e) => setcategory({...category , nomCategorie:e.target.value})}
                    
                  type="text"
                  className="form-control"
                  id="basicInput"
                  placeholder="Enter text"
                />
              </div>
              <div className="form-group">
                <label htmlFor="basicInput">{t("Libellé(englais)")}</label>
                <input
                  onChange={(e) => setcategory({...category , nomCategorieEnglish:e.target.value})}
                    
                  type="text"
                  className="form-control"
                  id="basicInput"
                  placeholder="Enter text"
                />
              </div>
              <div className="form-group">
                <label htmlFor="basicInput">{t("Libellé(arabe)")}</label>
                <input
                  onChange={(e) => setcategory({...category , nomCategorieArabe:e.target.value})}
                    
                  type="text"
                  className="form-control"
                  id="basicInput"
                  placeholder="Enter text"
                />
              </div>
              <div className="form-group">
                <label htmlFor="basicInput">{t("icon")}</label>
                <input
                  onChange={handleImageChange}
                  type="file"
                  className="form-control"
                  id="basicInput"
                  placeholder="Enter text"
                />
              </div>
            
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-3" onClick={goBack}>
            {t("Annuler")}
          </button>
          <button type="submit" className="btn btn-primary">
            {t("Enregistrer")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CatCreate;
