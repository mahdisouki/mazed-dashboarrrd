import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "choices.js/public/assets/styles/choices.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from 'js-cookie';

function Configuration() {
  const token = Cookies.get('token');
  const { t } = useTranslation();
  const [showEmail1, setShowEmail1] = useState(true);
  const [showEmail2, setShowEmail2] = useState(true);
  const [showFac, setShowFac] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = React.createRef();

  const [dataConfig, setDataConfig] = useState({
    coutClic: 0,
    coutParticipation: 0,
    valeurMajoration: [],
    facilité: false,
    valeurFacilité: 0,
    datedeclenchement: Date.now(),
    datefermeture: Date.now(),
    unité: "MOIS",
    nombreParticipantAttendu: 0,
    nombreMois: 0,
    extensionTime: 0,
    ContractEnchere: "",          // French contract
    ContractEnchereAr: "",       // Arabic contract
    ContractEnchereEn: "",       // English contract
    autoFinancement: 0
  });

  const [dateScheduled, setDateScheduled] = useState(Date.now());

  const handleCheckbox1Change = () => {
    setShowEmail1(!showEmail1);
  };

  const handleCheckbox2Change = () => {
    setShowEmail2(!showEmail2);
    setShowFac(!showFac);
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
        deleteItem();
        Swal.fire({
          title: "Annuler(e) !",
          text: "Votre élément a été supprimé.",
          icon: "success",
          iconColor: "black",
          confirmButtonColor: "#b0210e", // Change to your desired color
          confirmButtonText: "OK"
        });
      } else {
        Swal.fire({
          title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e", // Change to your desired color
          confirmButtonText: "OK"
        });
      }
    });
  };

  const deleteItem = () => {
    // Implement your delete logic here
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDataConfig(prevState => ({
      ...prevState,
      ContractEnchere: file // French contract
    }));
  };

  const handleArabicFileChange = (e) => {
    const file = e.target.files[0];
    setDataConfig(prevState => ({
      ...prevState,
      ContractEnchereAr: file // Arabic contract
    }));
  };

  const handleEnglishFileChange = (e) => {
    const file = e.target.files[0];
    setDataConfig(prevState => ({
      ...prevState,
      ContractEnchereEn: file // English contract
    }));
  };

  const addBidConfig = async () => {
    try {
      const formData = new FormData();
      Object.keys(dataConfig).forEach(key => {
        formData.append(key, dataConfig[key]);
      });

      // Add IdEnchere to FormData
      formData.append('IdEnchere', localStorage.getItem('idEnchereConf'));

      // Add ContractEnchere file to FormData
      if (dataConfig.ContractEnchere) {
        formData.append('ContractEnchere', dataConfig.ContractEnchere);
      } else {
        console.error('ContractEnchere file is missing.');
        return;
      }

      // Add ContractEnchereAr file to FormData
      if (dataConfig.ContractEnchereAr) {
        formData.append('ContractEnchereAr', dataConfig.ContractEnchereAr);
      } else {
        console.error('ContractEnchereAr file is missing.');
        return;
      }

      // Add ContractEnchereEn file to FormData
      if (dataConfig.ContractEnchereEn) {
        formData.append('ContractEnchereEn', dataConfig.ContractEnchereEn);
      } else {
        console.error('ContractEnchereEn file is missing.');
        return;
      }

      // Send the request with FormData
      const res = await axios.post(
        "http://localhost:8081/api/bid/publishBidNow",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(res);
      localStorage.removeItem('idEnchereConf');
    } catch (error) {
      console.log(error);
    }
  };

  const addScheduledbid = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(dataConfig).forEach(key => {
        formData.append(key, dataConfig[key]);
      });

      // Add IdEnchere and publicationDate to FormData
      formData.append('IdEnchere', localStorage.getItem('idEnchereConf'));
      formData.append('publicationDate', dateScheduled);

      // Send the request with FormData
      const res = await axios.post(
        "http://localhost:8081/api/bid/scheduleBidPublication",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(res.data);
      localStorage.removeItem('idEnchereConf');
    } catch (error) {
      console.error("Error scheduling bid:", error);
    }
  };

  // State for valeurMajoration
  const [valeurMajoration, setValeurMajoration] = useState([]);
  const [newValue, setNewValue] = useState('');

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
                                <label htmlFor="participation-cost">{t("Cout Du Participation")}</label>
                                <input
                                  onChange={e => setDataConfig({ ...dataConfig, coutParticipation: e.target.value })}
                                  type="number"
                                  id="participation-cost"
                                  className="form-control"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="click-cost">{t("Cout Du Clic")}</label>
                                <input
                                  onChange={e => setDataConfig({ ...dataConfig, coutClic: e.target.value })}
                                  type="number"
                                  id="click-cost"
                                  className="form-control"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="extension-time">{t("Extension Time")}</label>
                                <input
                                  onChange={e => setDataConfig({ ...dataConfig, extensionTime: e.target.value })}
                                  type="number"
                                  id="extension-time"
                                  className="form-control"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="auto-financement">{t("Auto Financement")}</label>
                                <input
                                  onChange={e => setDataConfig({ ...dataConfig, autoFinancement: e.target.value })}
                                  type="number"
                                  id="auto-financement"
                                  className="form-control"
                                  placeholder={t("Ecrire Ici")}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="contract">{t("Contrat (Français)")}</label>
                                <input
                                  ref={fileInputRef}
                                  onChange={handleFileChange}
                                  type="file"
                                  id="contract"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="contractAr">{t("Contrat (Arabe)")}</label>
                                <input
                                  type="file"
                                  onChange={handleArabicFileChange}
                                  id="contractAr"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label htmlFor="contractEn">{t("Contrat (Anglais)")}</label>
                                <input
                                  type="file"
                                  onChange={handleEnglishFileChange}
                                  id="contractEn"
                                  className="form-control"
                                  required
                                />
                              </div>
                            </div>
                            <div className='col-12'>
                              <label htmlFor="valeur-majoration">{t("Valeur de majoration")}</label><br />
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
                                    onChange={e => setDataConfig({ ...dataConfig, valeurFacilité: e.target.value })}
                                    type="number"
                                    id="email-id-vertical2"
                                    className="col-6 form-control"
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
                                    onChange={e => setDataConfig({ ...dataConfig, unité: e.target.value })}
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
                            <div className="col-12">
                              <label htmlFor="expected-participants">{t("Nb attendu des participants")}</label>
                              <div className="form-group">
                                <input
                                  onChange={e => setDataConfig({ ...dataConfig, nombreParticipantAttendu: e.target.value })}
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
                                  onChange={e => setDataConfig({ ...dataConfig, datedeclenchement: e.target.value })}
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
                                  onChange={e => setDataConfig({ ...dataConfig, datefermeture: e.target.value })}
                                  type="datetime-local"
                                  id="closing-date"
                                  className="form-control"
                                  placeholder={t("Écrivez ici")}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>{t("Planifier")}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form onSubmit={e => addScheduledbid(e)} className="mb-3">
                          <label htmlFor="dateInput" className="form-label">{t("Date")}</label>
                          <input onChange={e => setDateScheduled(e.target.value)} type="datetime-local" className="form-control" id="dateInput" />
                          <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t("Fermer")}
                          </Button>
                          <Button type='submit' variant="primary">
                            {t("Planifier")}
                          </Button>
                        </form>
                      </Modal.Body>
                    </Modal>
                    <br />
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary ms-1"
                        onClick={() => setShowModal(true)}
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
                        onClick={() => handleCloseModal()}
                      >
                        <span className="d-none d-sm-block">{t("Annuler")}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Configuration;
