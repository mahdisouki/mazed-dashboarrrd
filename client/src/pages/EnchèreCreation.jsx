import React , {useContext, useState , useEffect} from 'react';
import { useTranslation } from "react-i18next";
import Swal from 'sweetalert2';
import '../css/EnchèreCreation.css';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from "axios"
import { GlobalState } from "../GlobalState";
import Cookies from 'js-cookie'
function EnchèreCreation() {
  const token = Cookies.get('token')
  const state = useContext(GlobalState);
  const categories = state.Categories;
  const { t } = useTranslation();
  const [steps , setSteps] = useState(0);
  const fileInputRef = React.createRef();


  const [data , setData] = useState({
    ref:"",
    categoryName:categories[0].nomCategorie,
    ville:"Sousse",
    prixMazedOnline:0,
    avocat:"",
    noataire:"",
    libProduct:"",
    critére:[],
    galerie:[],
    description:""
          })
  const [dataConfig , setDataConfig] = useState({
      coutClic:0,
      coutParticipation:0,
      valeurMajoration:[],
      facilité:false,
      valeurFacilité:0,
      datedeclenchement:Date.now(),
      datefermeture:Date.now(),
      unité:"MOIS",
      nombreParticipantAttendu:0,
      nombreMois:0,
      extensionTime:0,
      ContractEnchere:""

  })
  const [showEmail1, setShowEmail1] = useState(false);
  const [showEmail2, setShowEmail2] = useState(false);
  const [showFac, setShowFac] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [critereInputs, setCritereInputs] = useState([{ label: "", value: "" }]);
  const [dateScheduled , setDateScheduled] = useState(Date.now());

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
  

  const handleCheckbox1Change = () => {
    setShowEmail1(!showEmail1);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDataConfig(prevState => ({
      ...prevState,
      ContractEnchere: file // Store the file object
    }));
  };

  useEffect(() => {
    console.log('ContractEnchere file:', dataConfig.ContractEnchere);
  }, [dataConfig.ContractEnchere]);
  useEffect(() => {
    if (categories.length > 0) {
      setData(prevData => ({
        ...prevData,
        categoryName: categories[0].nomCategorie // Set first category as default
      }));
    }
  }, [categories]);
  const handleCheckbox2Change = () => {
    console.log(dataConfig)
    setShowEmail2(!showEmail2);
    setShowFac(!showFac);
    setDataConfig({...dataConfig , facilité:showFac})
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = () => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Une fois supprimé(e), vous ne pourrez pas récupérer cet élément !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Oui, Annuler-le !",
      cancelButtonText: "Non, annuler !",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Call deleteItem function
        deleteItem();
        Swal.fire({
          title: "Annuler(e) !",
          text: "Votre élément a été supprimé.",
          icon: "success",
          iconColor:"black",
          confirmButtonColor: "#b0210e", // Change to your desired color
          confirmButtonText: "OK"
        });      } else {
        Swal.fire({
          title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e", // Change to your desired color
          confirmButtonText: "OK"
        });      }
    });
  };
  const deleteItem = () => {
    // Implement your delete logic here
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
          'Content-Type': 'application/json',
          headers : {Authorization: `Bearer ${token}`}
        }
      });
      console.log(res.data);
      localStorage.setItem("idenchere" , res.data.id)
      setSteps(steps+1);
    } catch (error) {
      console.error("Error adding bid:", error);
    }
  };
  const addBidConfig = async () => {
    try {
      // Create a FormData instance
      const formData = new FormData();
      
      // Add individual fields to FormData
      formData.append('coutClic', dataConfig.coutClic);
      formData.append('coutParticipation', dataConfig.coutParticipation);
      formData.append('facilité', dataConfig.facilité);
      formData.append('valeurFacilité', dataConfig.valeurFacilité);
      formData.append('datedeclenchement', dataConfig.datedeclenchement);
      formData.append('datefermeture', dataConfig.datefermeture);
      formData.append('unité', dataConfig.unité);
      formData.append('nombreParticipantAttendu', dataConfig.nombreParticipantAttendu);
      formData.append('nombreMois', dataConfig.nombreMois);
      formData.append('extensionTime', dataConfig.extensionTime);
  
      // Add array elements (valeurMajoration) to FormData
      const valeurMajorationString = valeurMajoration.join(', ');
      formData.append('valeurMajoration', valeurMajorationString);
  
      // Add IdEnchere to FormData
      formData.append('IdEnchere', localStorage.getItem('idenchere'));
      
      // Add ContractEnchere file to FormData
      if (dataConfig.ContractEnchere) {
        formData.append('ContractEnchere', dataConfig.ContractEnchere);
      } else {
        console.error('ContractEnchere file is missing.');
        return;
      }
  
      // Send the request with FormData
      const res = await axios.post(
        `http://localhost:8081/api/bid/publishBidNow`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Important to set this header
          },
        }
      );
  
      console.log(res);
      localStorage.removeItem('idenchere');
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  
  
  const addScheduledbid = async (e) => {
    try {
      e.preventDefault();
  
      // Create a FormData instance
      const formData = new FormData();
      
      // Add individual fields from dataConfig to FormData
      Object.keys(dataConfig).forEach(key => {
        formData.append(key, dataConfig[key]);
      });
  
      // Add array elements (valeurMajoration) to FormData
      const valeurMajorationString = valeurMajoration.join(', ');
      formData.append('valeurMajoration', valeurMajorationString);
  
      // Add IdEnchere and publicationDate to FormData
      formData.append('IdEnchere', localStorage.getItem('idenchere'));
      formData.append('publicationDate', dateScheduled);
  
      // Send the request with FormData
      const res = await axios.post(
        `http://localhost:8081/api/bid/scheduleBidPublication`,
        formData, // Send formData as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Important to set this header
          },
        }
      );
  
      console.log(res.data);
    } catch (error) {
      console.log(error);
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
   // State for valeurMajoration
   const [valeurMajoration, setValeurMajoration] = useState([]);
  
   // State for the input value
   const [newValue, setNewValue] = useState('');
 
   // Handler for adding a new value
   const handleAddValue = () => {
     if (newValue) {
       setValeurMajoration([...valeurMajoration, parseInt(newValue)]);
       setNewValue(''); // Clear input field after adding
     }
   };
 
   // Handler for input change
   const handleInputChange = (e) => {
     setNewValue(e.target.value);
   };
   const handleDeleteValue = (index) => {
    setValeurMajoration(valeurMajoration.filter((_, i) => i !== index));
  };
  return (
    <>
    {steps === 0 && (
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
                              <select  onChange={e=>setData({...data , ville:e.target.value})} className="form-select" id="basicSelect" required>
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
    )}
    




{steps ===1 && (
  <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="page-heading">
          <section id="basic-vertical-layouts">
            <div className="match-height">
              <div>
                <div className="card">
                  <div className="card-header">
                    <h2 className="new-price" id="myModalLabel33">
                      {t("Configuration De L'enchere")}
                    </h2>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <form className="form form-vertical">
                        <div className="form-body">
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="participation-cost">
                                  {t("Cout Du Participation")}
                                </label>
                                <input
                                  onChange={e=>setDataConfig({...dataConfig ,coutParticipation:e.target.value })}
                                  type="number"
                                  id="participation-cost"
                                  className="form-control"
                                  name="participation-cost"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="click-cost">
                                  {t("Cout Du Clic")}
                                </label>
                                <input
                                 onChange={e=>setDataConfig({...dataConfig ,coutClic:e.target.value })}
                                  type="number"
                                  id="click-cost"
                                  className="form-control"
                                  name="click-cost"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                                <div className="col-12">
                                  <div className="form-group">
                                    <label htmlFor="contract">{t("Contrat")}</label>
                                    <input
                                      ref={fileInputRef}
                                      onChange={handleFileChange}
                                      type="file"
                                      id="contract"
                                      className="form-control"
                                      name="contract"
                                      placeholder={t("Ecrire Ici")}
                                      required
                                    />
                                  </div>
                                </div>
                            <div className='col-12'>
                            <label htmlFor="click-cost">
                                  {t("Valeur de majoration")}
                                </label><br/>
                            <input
        type="number"
        value={newValue}
        onChange={handleInputChange}
        placeholder="Add valeurMajoration"
      />
      <button className="btn btn-primary ms-1" type="button" onClick={handleAddValue}>Add</button>

      {/* Display the list */}
      <ul>
        {valeurMajoration.map((value, index) => (
          <li key={index}>
            {value}
            <button className="btn btn-secondary ms-3" type="button" onClick={() => handleDeleteValue(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
                            </div>
                            {/* <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="increment-value">
                                  {t("Valeur De Majoration")}
                                </label>
                                <input
                                 onChange={e=>setDataConfig({...dataConfig ,valeurMajoration:e.target.value })}
                                  type="number"
                                  id="increment-value"
                                  className="form-control"
                                  name="increment-value"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div> */}
                            {/* <div className="col-12 checkbox">
                              <input
                                type="checkbox"
                                id="checkbox1"
                                className="col-1 form-check-input"
                                checked={showEmail1}
                                onChange={handleCheckbox1Change}
                              />
                              <span>Remboursement</span>
                            </div>
                            {showEmail1 && (
                              <div className="col-12">
                                <input
                                  type="text"
                                  id="email-id-vertical1"
                                  className="col-6 form-control"
                                  name="email-id"
                                  placeholder="Ecrire Ici"
                                  required
                                />
                              </div>
                            )} */}
                            <br />
                            <br />
                            <div className="row">
                              <div className="col-12 checkbox">
                                <input
                                
                                  type="checkbox"
                                  id="checkbox2"
                                  className="col-6 form-check-input"
                                  checked={showEmail2}
                                  onChange={handleCheckbox2Change}
                                />
                                <span>Facilité</span>
                              </div>
                              {showEmail2 && (
                                <div className="col-6">
                                  <input
                                  onChange={e=>setDataConfig({...dataConfig , valeurFacilité:e.target.value})}
                                    type="number"
                                    id="email-id-vertical2"
                                    className="col-6 form-control"
                                    name="email-id"
                                    placeholder="Ecrire Ici"
                                    required
                                  />
                                </div>
                              )}
                              {showFac && (
                                <fieldset
                                  style={{ padding: "0px", margin: "0px" }}
                                  id="fac"
                                  className="col-6 form-group"
                                >
                                  <select
                                  onChange={e=>setDataConfig({...dataConfig , unité:e.target.value})}
                                    className="form-select"
                                    id="basicSelect"
                                    required
                                  >
                                    <option value={"MOIS"}>Mois</option>
                                    <option value={"ANNEE"}>L'année</option>
                                  </select>
                                </fieldset>
                              )}
                            </div>

                          
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <br/>
            <div className="card">
              <div
              style={{ backgroundColor: "white", padding: 20 }}
              className="modal-content"
            >
              <div className="modal-header">
                <h2 className="new-price" id="myModalLabel33">
                  {t("Ajouter une nouvelle Configuration")}
                </h2>
              </div>
              <form action="#">
                <div className="modal-body">
                  <label htmlFor="expected-participants">
                    {t("Nb attendu des participants")}
                  </label>
                  <div className="form-group">
                    <input
                      onChange={e=>setDataConfig({...dataConfig , nombreParticipantAttendu:e.target.value})}

                      type="number"
                      id="expected-participants"
                      className="form-control"
                      placeholder={t("Écrivez ici")}
                      maxLength={25}
                      required
                    />
                  </div>
                  <label htmlFor="launch-date">{t("Date de Lancement")}</label>
                  <div className="form-group">
                    <input
                    onChange={e=>setDataConfig({...dataConfig , datedeclenchement:e.target.value})}
                      type="datetime-local"
                      id="launch-date"
                      className="form-control"
                      placeholder={t("Écrivez ici")}
                      required
                    />
                  </div>
                  <label htmlFor="closing-date">{t("Date de Fermeture")}</label>
                  <div className="form-group">
                    <input
                    onChange={e=>setDataConfig({...dataConfig , datefermeture:e.target.value})}
                      type="datetime-local"
                      id="closing-date"
                      className="form-control"
                      placeholder={t("Écrivez ici")}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary ms-1"
                    onClick={handleOpenModal}
                  >
                    <span className="d-none d-sm-block">{t("Planifier")}</span>
                  </button>
                  <button
                  onClick={addBidConfig}
                    type="button"
                    className="btn btn-primary ms-1"
                  >
                    <span className="d-none d-sm-block">{t("Publier")}</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary ms-1"
                    onClick={()=>setSteps(steps-1)}
                  >
                    <span className="d-none d-sm-block">{t("Annuler")}</span>
                  </button>
                </div>
              </form>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("Planifier")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={e=>addScheduledbid(e)} className="mb-3">
            <label htmlFor="dateInput" className="form-label">{t("Date")}</label>
            <input onChange={e=>setDateScheduled(e.target.value)} type="datetime-local" className="form-control" id="dateInput" />
            <Button variant="secondary" onClick={handleCloseModal}>
            {t("Fermer")}
          </Button>
            <Button type='submit' variant="primary">
            {t("Planifier")}
          </Button>
          </form>
          
        </Modal.Body>
        <Modal.Footer>
         
         
        </Modal.Footer>
      </Modal>
    </div>
)}
    
    </>
  );
}

export default EnchèreCreation;
