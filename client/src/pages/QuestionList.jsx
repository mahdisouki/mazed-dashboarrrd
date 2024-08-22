import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import Cookies from 'js-cookie'
function QuestionList() {
  const token = Cookies.get('token')
  const { t , i18n } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalType, setModalType] = useState('');
  const [question , setQuestion]= useState({question:"" ,questionAr:"",questionEn:"", reponse:"" , reponseAr:"" ,reponseEn:"" })
  const state = useContext(GlobalState);
  const questions = state.Questions
  console.log(questions)
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
  const getQuestionName = (cat) => {
    switch (i18n.language) {
      case 'ar':
        return cat.questionAr || '';
      case 'en':
        return cat.questionEn || '';
      case 'fr':
      default:
        return cat.question || '';
    }
  };
  const getReponseName = (cat) => {
    switch (i18n.language) {
      case 'ar':
        return cat.reponseAr || '';
      case 'en':
        return cat.reponseEn || '';
      case 'fr':
      default:
        return cat.reponse || '';
    }
  };
  const openModal = (type, item) => {
    setModalType(type);
    setCurrentItem(item);
    setQuestion({...question , question:item.question ,questionAr:item.questionAr,questionEn:item.questionEn, reponse:item.reponse , reponseAr:item.reponseAr ,reponseEn:item.reponseEn })
  };
  const handleDelete =  (id) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteItem(id);
        console.log("fffffffffffffffffffffff")
        Swal.fire({   title: "Supprimer",
          text: "Votre élément est Supprimer:)",
          icon: "Succes",
          confirmButtonColor: "#b0210e",
        });      } else {
          Swal.fire({   title: "Annulé",
            text: "Votre élément est en sécurité :)",
            icon: "error",
            confirmButtonColor: "#b0210e",
          });            }
    });
  };

  const deleteItem = async(id) => {
    try {
      const res = await axios.delete(`http://localhost:8081/api/questions/${id}` , {headers : {Authorization: `Bearer ${token}`}});
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  };
const updateQuestion = async(e , id) =>{
  e.preventDefault();
  try {
    const res = await axios.put(`http://localhost:8081/api/questions/${id}` , question , {headers : {Authorization: `Bearer ${token}`}});
    console.log(res.data)
    } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="content-container">
      <div id="main">
        <div className="page-heading">
          <section className="section">
            <div className="card">
              <div className="card-header">
                <h2 className="new-price">{t("Liste des questions")}</h2>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  {isMobile ? (
                    <table className="table" id="table1">
                      <tbody>
                       {questions&& questions.map((item)=>(
                        <>
                         <tr>
                          <td>{t("La question")}</td>
                          <td>{getQuestionName(item)}</td>
                        </tr>
                        <tr>
                          <td>{t("Date de création")}</td>
                          <td>{t("05/05/2024")}</td>
                        </tr>
                        <tr>
                          <td>{t("Voir")}</td>
                          <td>
                            <i className="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#viewModal" ></i>
                          </td>
                        </tr>
                        <tr>
                          <td>{t("Editer")}</td>
                          <td>
                            <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#editModal"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>{t("Supprimer")}</td>
                          <td>
                            <i onClick={handleDelete} className="fa-solid fa-trash"></i>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2"><hr /></td>
                        </tr>
                        <tr>
                          <td>{t("La question")}</td>
                          <td>{t("Lorem Lorem")}</td>
                        </tr>
                        <tr>
                          <td>{t("Date de création")}</td>
                          <td>{t("05/05/2024")}</td>
                        </tr>
                        <tr>
                          <td>{t("Voir")}</td>
                          <td>
                            <i className="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => openModal('view', item)}></i>
                          </td>
                        </tr>
                        <tr>
                          <td>{t("Editer")}</td>
                          <td>
                            <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#editModal"  onClick={() => openModal('edit', item)}></i>
                          </td>
                        </tr>
                        <tr>
                          <td>{t("Supprimer")}</td>
                          <td>
                            <i onClick={handleDelete} className="fa-solid fa-trash"></i>
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
                          <th>{t("La question")}</th>
                          <th>{t("Date de création")}</th>
                          <th>{t("Voir")}</th>
                          <th>{t("Editer")}</th>
                          <th>{t("Supprimer")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {questions && questions.map((item)=>(
                          <tr>
                            <td>{getQuestionName(item)}</td>
                            <td>{item.updatedAt.split("T")[0]}</td>
                            <th>
                              <i className="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => openModal('view', item)}></i>
                            </th>
                            <th>
                              <i className="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => openModal('edit', item)}></i>
                            </th>
                            <th>
                              <i onClick={()=>handleDelete(item.id)} className="fa-solid fa-trash"></i>
                            </th>
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
      </div>

      {/* View Modal */}
      <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">{t("Détail de Question")}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h6>la reponse :</h6>
              <p>{currentItem?getReponseName(currentItem):""}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t("Fermer")}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">{t("Éditer Question")}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={e=>updateQuestion(e , currentItem.id)} className="form form-vertical">
                <div className="form-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group has-icon-left">
                        <label htmlFor="question" className="form-label">{t("La question")}</label>
                        <textarea value={question.question} onChange={e=>setQuestion({...question , question:e.target.value})} className="form-control" id="question" rows={3}></textarea>
                      </div>
                      <div className="form-group has-icon-left">
                        <label htmlFor="answer" className="form-label">{t("La réponse")}</label>
                        <textarea value={question.reponse} onChange={e=>setQuestion({...question , reponse:e.target.value})} className="form-control" id="answer" rows={3}></textarea>
                      </div>
                      <div className="form-group has-icon-left">
                        <label htmlFor="answer" className="form-label">{t("La question(arabe)")}</label>
                        <textarea value={question.questionAr} onChange={e=>setQuestion({...question , questionAr:e.target.value})} className="form-control" id="answer" rows={3}></textarea>
                      </div>
                      <div className="form-group has-icon-left">
                        <label htmlFor="answer" className="form-label">{t("La réponse(arabe)")}</label>
                        <textarea value={question.reponseAr} onChange={e=>setQuestion({...question , reponseAr:e.target.value})} className="form-control" id="answer" rows={3}></textarea>
                      </div>
                      <div className="form-group has-icon-left">
                        <label htmlFor="answer" className="form-label">{t("La question(englais)")}</label>
                        <textarea value={question.questionEn} onChange={e=>setQuestion({...question , questionEn:e.target.value})} className="form-control" id="answer" rows={3}></textarea>
                      </div>
                      <div className="form-group has-icon-left">
                        <label htmlFor="answer" className="form-label">{t("La réponse(englais)")}</label>
                        <textarea value={question.reponseEn} onChange={e=>setQuestion({...question , reponseEn:e.target.value})} className="form-control" id="answer" rows={3}></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t("Annuler")}</button>
              <button type="submit" className="btn btn-primary">{t("Enregistrer")}</button>
            </div>
              </form>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionList;
