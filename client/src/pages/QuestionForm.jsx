import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Cookies from 'js-cookie'
function QuestionForm() {
  const token = Cookies.get('token');
  const [question , setQuestion]= useState({question:"" ,reponse:"" })
  const { t } = useTranslation();
  const addQuestion = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/questions/create", question , {headers : {Authorization: `Bearer ${token}`}});
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
              <h2 className="new-price">{t("Ajouter une Question")}</h2>
            </div>
            <div className="card-content">
              <div className="card-body">
                <form onSubmit={addQuestion} className="form form-vertical">
                  <div className="form-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group has-icon-left">
                          <label htmlFor="question" className="form-label">
                            {t("La question")}
                          </label>
                          <textarea
                            className="form-control"
                            id="question"
                            rows={3}
                            onChange={e=>setQuestion({...question , question:e.target.value})}
                          />
                        </div>
                        <div className="form-group has-icon-left">
                          <label htmlFor="reponse" className="form-label">
                            {t("La réponse")}
                          </label>
                          <textarea
                            className="form-control"
                            id="reponse"
                            rows={3}
                            onChange={e=>setQuestion({...question , reponse:e.target.value})}
                          />
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

export default QuestionForm;
