import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Cookies from 'js-cookie'
function TermsForm() {
  const token = Cookies.get('token')
  const [termes , setTermes] = useState({text :"" , sujet:""})
  const { t } = useTranslation();
  const submitTerme = async(e)=>{
    e.preventDefault();
    try {
      console.log(termes)
      const res = await axios.post("http://localhost:8081/api/termes/createTermes", termes , {headers : {Authorization: `Bearer ${token}`}})
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="content-container">
      <div id="main">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h2 className="new-price">{t("Ajouter un terme")}</h2>
            </div>
            <div className="card-content">
              <div className="card-body">
                <form onSubmit={submitTerme} className="form form-vertical">
                  <div className="form-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group has-icon-left">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            {t("Text")}
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={""}
                            onChange={e=>setTermes({...termes , text:e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <fieldset className="form-group">
                          <label>{t("Sujet")}</label>
                          <select onChange={e=>setTermes({...termes , sujet:e.target.value})} className="form-select" id="basicSelect">
                            <option value={"CREATION_COMPTE_ACHETEUR"}>{t("Création d'un compte acheteur")}</option>
                            <option value={"CREATION_COMPTE_VENDEUR"}>{t("Création d'un compte vendeur")}</option>
                            <option value={"PARTICIPATION_ENCHERE"}>{t("Participation à une enchère")}</option>
                            <option value={"ENCHERIR"}>{t("enchérir")}</option>
                          </select>
                        </fieldset>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light-secondary me-2"
                          data-bs-dismiss="modal"
                        >
                          <i className="bx bx-x d-block d-sm-none" />
                          <span className="btn btn-secondary">{t("Annuler")}</span>
                        </button>
                        <br />
                        <br />
                        <br />
                        <button
                          type="submit"
                          className="btn btn-primary"
                          id="suivantBtn"
                        >
                          {t("Enregistrer")}
                        </button>
                      </div>
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

export default TermsForm;
