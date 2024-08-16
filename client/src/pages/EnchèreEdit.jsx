import React, { useState , useContext } from 'react';
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';
import '../css/EnchèreCreation.css';
import { Link } from 'react-router-dom';
import { GlobalState } from '../GlobalState';
import axios from 'axios';
function EnchèreEdit(props) {
  const { t } = useTranslation();
  const [data , setData] = useState({ 
    ref:props.selectedItem.ref,
    categoryName:props.selectedItem.categoryName,
    ville:props.selectedItem.ville,
    prixMazedOnline:0,
    avocat:props.selectedItem.avocat,
    noataire:props.selectedItem.noataire,
    libProduct:props.selectedItem.libProduct,
    critére:[],
    galerie:[],
    description:props.selectedItem.description});
  const confirmAction = (actionType) => {
    Swal.fire({
      title: t("Êtes-vous sûr?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Oui"),
      cancelButtonText: t("Non, annuler!"),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(t("Terminé"), t("L'élément a été ajoutée"), "secondary");
      }
    });
  };




  const [steps , setSteps] = useState(0);
  const [critereInputs, setCritereInputs] = useState([{ label: "", value: "" }]);
  const state = useContext(GlobalState);
  const categories = state.Categories;
  const handleGalerieChange = (event) => {
    const files = Array.from(event.target.files);
  
    // Convert files to base64
    const filePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result); // base64 string
        };
        reader.onerror = reject;
        reader.readAsDataURL(file); // Read file as base64
      });
    });
  
    // Wait for all files to be converted
    Promise.all(filePromises)
      .then(base64Files => {
        // Ensure galerie is updated with base64 files
        setData(prevData => ({
          ...prevData,
          galerie: base64Files
        }));
      })
      .catch(error => {
        console.error("Error converting files to base64:", error);
      });
  };
  





  const addBid = async () => {
    try {
      // Convert critereInputs array to a map
      const critéreMap = critereInputs.reduce((acc, input) => {
        if (input.label && input.value) {
          acc[input.label] = input.value;
        }
        return acc;
      }, {});
    
      const updatedData = { ...data, critére: critéreMap };
    
      console.log(updatedData); // Debugging: check the formatted data
    
     
    
      const res = await axios.post("http://localhost:8081/api/bid/createBrouillon", updatedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data);
      localStorage.setItem("idenchere" , res.data.id)
      setSteps(steps+1);
    } catch (error) {
      console.error("Error adding bid:", error);
    }
  };
 
 
  const handleCritereChange = (index, field, value) => {
    const newCritereInputs = [...critereInputs];
    newCritereInputs[index][field] = value;
    setCritereInputs(newCritereInputs);
    console.log(critereInputs)
  };

  const addCritereInput = () => {
    setCritereInputs([...critereInputs, { label: "", value: "" }]);
  };
  




  return (
    <div className='content-container'>
    <div className="page-heading">
      <section id="basic-vertical-layouts">
        <div className="match-height">
          <div>
            <div className="card">
              <div className="card-header">
                <h2 className="new-price">{t("Création De Enchere")}</h2>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <form className="form form-vertical">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-12">
                        </div>
                        

                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="email-id-vertical">{t("Reference")}</label>
                            <input onChange={e=>setData({...data , ref:e.target.value})} type="text" id="email-id-vertical" className="form-control" name="email-id" placeholder={t("Reference")} required />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="email-id-vertical">{t("Prix Mazed Online")}</label>
                            <input onChange={e=>setData({...data , prixMazedOnline:e.target.value})} type="number" id="email-id-vertical" className="form-control" name="email-id" placeholder={t("prix mazad")} required />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="email-id-vertical">{t("Notaire")}</label>
                            <input onChange={e=>setData({...data , noataire:e.target.value})} type="text" id="email-id-vertical" className="form-control" name="email-id" placeholder={t("Notaire")} required />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <label htmlFor="email-id-vertical">{t("Avocat")}</label>
                            <input onChange={e=>setData({...data , avocat:e.target.value})} type="text" id="email-id-vertical" className="form-control" name="email-id" placeholder={t("Avocat")} required />
                          </div>
                        </div>
                        <div className="col-12">
                          <label>{t("categorie")}</label>
                          <fieldset className="form-group">
                            <select onChange={e=>setData({...data , categoryName:e.target.value})} className="form-select" id="basicSelect" required>
                              {categories && categories.map((item)=>(
                                <option value={item.nomCategorie}>{item.nomCategorie}</option>
                              ))}
                              
                            </select>
                          </fieldset>
                        </div>
                        <div className="col-12">
                          <label>{t("Produit")}</label>
                          <div className="form-group">
                          <input onChange={e=>setData({...data , libProduct:e.target.value})} type="text" id="email-id-vertical" className="form-control" name="email-id" placeholder={t("Produits")} required />

                          </div>
                        </div>
                        <div className="col-12">
                          <label>{t("description")}</label>
                          <div className="form-group">
                          <textarea onChange={e=>setData({...data , description:e.target.value})} type="text" id="email-id-vertical" className="form-control" name="email-id" placeholder={t("description")} required />

                          </div>
                        </div>
                        <div className="col-12">
                          <label>{t("galerie")}</label>
                          <div className="form-group">
                          <input onChange={handleGalerieChange} type="file" multiple id="email-id-vertical" className="form-control" name="email-id" placeholder={t("galerie")} required />

                          </div>
                        </div>
                        <div className="col-12">
                          <label>{t("Ville")}</label>
                          <fieldset className="form-group">
                            <select onChange={e=>setData({...data , ville:e.target.value})} className="form-select" id="basicSelect" required>
                              <option>{t("Sousse")}</option>
                              <option>{t("Gafsa")}</option>
                              <option>{t("Tunis")}</option>
                              <option>{t("Ariana")}</option>
                              <option>{t("Béja")}</option>
                              <option>{t("Ben Arous")}</option>
                              <option>{t("Bizerte")}</option>
                              <option>{t("Gabes")}</option>
                              <option>{t("Jendouba")}</option>
                              <option>{t("Kairouan")}</option>
                              <option>{t("Kasserine")}</option>
                              <option>{t("Kebili")}</option>
                              <option>{t("La Manouba")}</option>
                              <option>{t("Le Kef")}</option>
                              <option>{t("Mahdia")}</option>
                              <option>{t("Médenine")}</option>
                              <option>{t("Monastir")}</option>
                              <option>{t("Nabeul")}</option>
                              <option>{t("Sfax")}</option>
                              <option>{t("Sidi Bouzid")}</option>
                              <option>{t("Siliana")}</option>
                              <option>{t("Tataouine")}</option>
                              <option>{t("Tozeur")}</option>
                              <option>{t("Zaghouan")}</option>
                            </select>
                          </fieldset>
                        </div>
                        {critereInputs.map((critere, index) => (
                              <div className="col-12" key={index}>
                                <label>{t("Critère")}</label>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t("Label")}
                                    value={critere.label}
                                    onChange={(e) => handleCritereChange(index, "label", e.target.value)}
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={t("Value")}
                                    value={critere.value}
                                    onChange={(e) => handleCritereChange(index, "value", e.target.value)}
                                  />
                                </div>
                              </div>
                            ))}
                            <div className="col-12">
<button type="button" className="btn btn-secondary" onClick={addCritereInput}>
  {t("Ajouter un nouveau critère")}
</button>
</div>
                        <br/>
                          <br/>
                          <br/>
                          <br/>
                        <div className="col-12 d-flex justify-content-end">
                          <button type="reset" className="btn btn-secondary me-1 mb-1">
                            {t("Annuler")}
                          </button>
                          
                            <a onClick={addBid} className="btn btn-primary me-1 mb-1" style={{ color: 'white' }}>{t("Suivant")}</a>
                          
                        </div>
                      </div>
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
  );
}

export default EnchèreEdit;
