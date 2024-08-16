import React  , {useState}from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Cookies from 'js-cookie'
function QuestionEdit() {
  const token = Cookies.get('token');
  const [question , setQuestion]= useState({Question:"" ,reponse:""})
  const { t } = useTranslation();
  const editQuestion = async(id)=>{
    try {
      const res = await axios.put(`http://localhost:8081/api/questions/${id}` , {headers : {Authorization: `Bearer ${token}`}});
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
              <h4 className="card-title">{t("détail de question")}</h4>
            </div>
            <div className="card-content">
              <div className="card-body">
                <form className="form form-vertical">
                  <div className="form-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group has-icon-left">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            {t("La question")}
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={""}
                          />
                        </div>
                        <div className="form-group has-icon-left">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            {t("La réponse")}
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={3}
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-light-secondary me-2"
                          data-bs-dismiss="modal"
                        >
                          <i className="bx bx-x d-block d-sm-none" />
                          <span className="btn btn-secondary">{t("Supprimer")}</span>
                        </button>
                        <br/>
                        <br/>
                        <br/>
                        <button
                          type="button"
                          className="btn btn-primary"
                          id="suivantBtn"
                        >
                          {t("Editer")}
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

export default QuestionEdit;
