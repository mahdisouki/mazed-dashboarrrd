import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { GlobalState } from "../GlobalState";
import axios from "axios";
import Cookies from 'js-cookie'
import '../css/Download.css'
// Modal component
function Modal({ t  , id , traiterDemande}) {
  const [cause , setCause] = useState();
  return (
    <div
      className="modal fade text-left"
      id="default"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="myModalLabel1">
              {t("Cause")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="card-body">
            <div className="form-group with-title mb-3">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={e=>setCause(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn" data-bs-dismiss="modal">
              <i className="bx bx-x d-block d-sm-none"></i>
              <span className="d-none d-sm-block">{t("Annulé")}</span>
            </button>
            <button
              type="button"
              className="btn btn-primary ms-1"
              
            onClick={()=>traiterDemande(id , "REFUSER" ,cause )}>
              <i className="bx bx-check d-block d-sm-none"></i>
              <span className="d-none d-sm-block">{t("Envoyer")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// TableRow component
function TableRow({ userData, onAccept }) {
  const token = Cookies.get('token')
  const { t } = useTranslation();
  const downloadFile = async (fileId, token) => {
    try {
      const res = await axios.get(`http://localhost:8081/api/demandeTransfert/file/${fileId}`, {
        responseType: 'blob', // This is important for downloading binary data
        headers: { Authorization: `Bearer ${token}` } // Assuming you need authorization
      });
  
      // Create a URL for the file blob and trigger a download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `file_${fileId}.png`); // Replace 'ext' with the appropriate file extension if known
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const traiterDemande = async (id, status, cause) => {
    try {
      console.log(id, status, cause);
      
      const res = await axios.post(
        `http://localhost:8081/api/demandeTransfert/traiter/${id}?statusDemande=${status}&cause=${cause}`, 
        {}, // Empty body
        {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAccept = () => {
    Swal.fire({
      title: t("Êtes-vous sûr(e) ?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: t("Oui"),
      cancelButtonText: t("Non, annuler !"),
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        onAccept();
        Swal.fire({   title: "Accepter",
          text: "Votre élément est Accepter :)",
          icon: "Succes",
          confirmButtonColor: "#b0210e",
        });       } else {
        Swal.fire({   title: "Annulé",
          text: "Votre élément est en sécurité :)",
          icon: "error",
          confirmButtonColor: "#b0210e",
        });       }
    });
  };

  return (
    <tr>
      <td>
      <div class="custom-button" >
  <div class="custom-button-wrapper">
    <a  class="custom-text">Download</a>
    <a onClick={() => downloadFile(userData.fileId, token)} class="custom-icon">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>
      </svg>
    </a>
  </div>
</div>
      </td>
      <td>{userData.montant}Dt</td>
      <td>{userData.acheteur.pseudo}</td>
      
      <td>{userData.createdAt?.split("T")[0]}</td>
      <td>{userData.typeRecharge}</td>
      <td>
        <span className={userData.statusDemande==="EN_ATTENTE"?'badge bg-info':userData.statusDemande==="REFUSER"?"badge bg-danger":"badge bg-success"}>{userData.statusDemande}</span>
      </td>
      {userData && userData.statusDemande==="EN_ATTENTE"?(
        <>
        <td>
        <i className="fa-solid fa-circle-check text-success" onClick={()=>traiterDemande(userData.id , "APPROUVER")}></i>
      </td>
      <td>
      
        <section id="basic-modals">
          <button
            type="button"
            className="btn btn-outline block"
            data-bs-toggle="modal"
            data-bs-target="#default"
          >
            <i className="fa-solid fa-circle-xmark text-danger"></i>
          </button>
          <Modal t={t} id ={userData.id} traiterDemande={traiterDemande} />
        </section>
      </td>
      </>
      ):(<>
      <td>-</td>
      <td>-</td>
      </>)}
      
    </tr>
  );
}

// ResponsiveTable component
function ResponsiveTable({ data, headers, isMobile }) {
  const { t } = useTranslation();

  const handleAccept = () => {
    // Handle acceptance logic
    console.log("Item accepted");
  };

  return (
    <div className="table-responsive datatable-minimal">
      {isMobile ? (
        <table className="table" id="table2">
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                <TableRow
                  userData={item}
                  
                  onAccept={handleAccept}
                />
                <tr>
                  <td colSpan="2">
                    <hr />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="table" id="table2">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{t(header)}</th>
              ))}
              <th>{t("Accepter")}</th>
              <th>{t("Refuser")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                userData={item}
                status={item.status}
                onAccept={handleAccept}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Transfer component
function Transfer() {
  const state = useContext(GlobalState);
  const demandesTransfert = state.demandesT || []
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

  const data = [
    {
      name: "Graiden",
      vehicle: "vehicula",
      value: "076",
      location: "Offenburg",
      note: "Lorem",
      status: {
        text: "Accepté",
        color: "secondary",
      },
    },
    {
      name: "Graiden",
      vehicle: "vehicula",
      value: "076",
      location: "Offenburg",
      note: "Lorem",
      status: {
        text: "Refusé",
        color: "danger",
      },
    },
    {
      name: "Graiden",
      vehicle: "vehicula",
      value: "076",
      location: "Offenburg",
      note: "Lorem",
      status: {
        text: "En attente",
        color: "warning",
      },
    },
  ];

  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>

        <div className="page-heading">
          <section className="section">
            <div className="card">
              <div className="card-header">
                <h2 className="new-price">{t("Demandes de transferts")}</h2>
              </div>
              <div className="card-body">
                <ResponsiveTable
                  data={demandesTransfert}
                  headers={[
                    "file",
                    "montant",
                    "pseudo",
                    "Date demande",
                    "Type Recharge",
                    "Statut",
                  ]}
                  isMobile={isMobile}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Transfer;
