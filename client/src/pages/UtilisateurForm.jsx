import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie'
function UtilisateurForm() {
  const token = Cookies.get('token')
  const { t } = useTranslation();
  const [data , setData] = useState({nomFamille:"" , prenom:"", pseudo:"" , email:"" , numTel:"" , role:""})
 //create user api bot found
  const addUser = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/admin/',data , {headers : {Authorization: `Bearer ${token}`}});
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
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="new-price">{t("Ajouter un Utilisateur")}</h2>
            </div>
            <div className="card-content">
              <div className="card-body">
                <form onSubmit={addUser} className="form form-vertical">
                  <div className="form-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="nom">{t("Nom")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="nom"
                              placeholder={t("Nom")}
                              maxLength={25}
                              onChange={e=>setData({...data, nomFamille:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="prenom">{t("Prénom")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="prenom"
                              placeholder={t("Prénom")}
                              maxLength={25}
                              onChange={e=>setData({...data, prenom:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="prenom">{t("Pseudo")}</label>
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control"
                              id="prenom"
                              placeholder={t("Pseudo")}
                              maxLength={25}
                              onChange={e=>setData({...data, pseudo:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="email">{t("Email")}</label>
                          <div className="position-relative">
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder={t("Email")}
                              maxLength={25}
                              onChange={e=>setData({...data, email:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="phone-number">
                            {t("Numéro de téléphone")}
                          </label>
                          <div className="input-group mb-1 phone-input-group">
                            <input
                              type="text"
                              className="form-control"
                              id="phone-number"
                              aria-label="PhoneNumber"
                              defaultValue="+216"
                              onChange={e=>setData({...data, numTel:e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="role">{t("Role")}</label>
                          <fieldset className="form-group mb-3">
                            <select onChange={e=>setData({...data, role:e.target.value})} className="form-select" id="role">
                            <option value={"Acheteur"}>{t("Acheteur")}</option>
                            <option value={"Vendeur"}>{t("Vendeur")}</option>
                            </select>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-secondary me-3"
                      >
                        {t("Annuler")}
                      </button>

                      <button type="submit" className="btn btn-primary">
                        {t("Enregistrer")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UtilisateurForm;
