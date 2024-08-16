import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { GlobalState } from '../GlobalState';

function Commandes() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const state = useContext(GlobalState);
  const commandes = state.Commandes;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1212); // Adjust this breakpoint as needed
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className='content-container'>
      <section className="section">
        <div className="row" id="table-contexual">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h2 className="new-price">{t("Tableau de Commandes")}</h2>
              </div>
              <div className="card-content">
                <div className="table-responsive">
                  {isMobile ? (
                    <MobileTable commandes={commandes} />
                  ) : (
                    <DesktopTable commandes={commandes} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StatusModal />
    </div>
  );
}

function DesktopTable({commandes}) {
  const { t } = useTranslation();
  return (
    <table className="table" id="table1">
      <thead>
        <tr>
        <th>{t("Image")}</th>
          <th>{t("Num Commande")}</th>
          <th>{t("Produit")}</th>
         
          <th>{t("Quantité")}</th>
          <th>{t("Prix Total")}</th>
          <th>{t("Date De Commande")}</th>
          <th>{t("Statut")}</th>
          <th>{t("Changer Statut")}</th>
        </tr>
      </thead>
      <tbody>
       {commandes&& commandes.map((item)=>(
        <tr className="table">
        <td><img className='imgtable' src="" alt="img"/></td>
          <td className="text-bold-500">{item.id}</td>
          <td>{item.produits&& item.produits.map((subitem)=>(<>{subitem.libelleProduct}<br/></>))}</td>
          <td>{item.quantité}</td>
          <td>{item.produits&& item.produits.map((subitem)=>(subitem.prixPrincipale)).reduce((acc, price) => acc + price, 0)}</td>
          <td>{item.createdAt?.split('T')[0]}</td>
          <td><span className="badge bg-secondary">{t(item.status)}</span></td>
          <td><i className="fa-solid fa-sliders" data-bs-toggle="modal" data-bs-target="#statusModal"></i></td>
        </tr>
       ))} 
        
      
      </tbody>
    </table>
  );
}

function MobileTable({commandes}) {
  const { t } = useTranslation();
  return (
    <table className="table" id="table1">
      <tbody>
        <tr>
          <td>{t("Num Commande")}</td>
          <td className="text-bold-500">111111</td>
        </tr>
        <tr>
          <td>{t("Produit")}</td>
          <td>Lorem Lorem</td>
        </tr>
        <tr>
          <td>{t("Image Produit")}</td>
          <td><img className='imgtable' src="" alt="img"/></td>
        </tr>
        <tr>
          <td>{t("Prix Produit")}</td>
          <td>200</td>
        </tr>
        <tr>
          <td>{t("Quantité")}</td>
          <td>500</td>
        </tr>
        <tr>
          <td>{t("Prix Total")}</td>
          <td>800</td>
        </tr>
        <tr>
          <td>{t("Date De Commande")}</td>
          <td>2000000</td>
        </tr>
        <tr>
          <td>{t("Status")}</td>
          <td><span className="badge bg-secondary">{t("Terminé")}</span></td>
        </tr>
        <tr>
          <td>{t("Changer Statut")}</td>
        <td><i className="fa-solid fa-sliders" data-bs-toggle="modal" data-bs-target="#statusModal"></i></td>
        </tr>
        <tr>
          <td colSpan="2"><hr /></td>
        </tr>
        <tr>
          <td>{t("Num Commande")}</td>
          <td className="text-bold-500">111111</td>
        </tr>
        <tr>
          <td>{t("Produit")}</td>
          <td>Lorem Lorem</td>
        </tr>
        <tr>
          <td>{t("Image")}</td>
          <td><img className='imgtable' src="" alt="img"/></td>
        </tr>
        <tr>
          <td>{t("Prix Produit")}</td>
          <td>200</td>
        </tr>
        <tr>
          <td>{t("Quantité")}</td>
          <td>500</td>
        </tr>
        <tr>
          <td>{t("Prix Total")}</td>
          <td>800</td>
        </tr>
        <tr>
          <td>{t("Date De Commande")}</td>
          <td>2000000</td>
        </tr>
        <tr>
          <td>{t("Status")}</td>
          <td><span className="badge bg-warning">{t("En Cours")}</span></td>
        </tr>
        <tr>
          <td>{t("Changer Statut")}</td>
        <td><i className="fa-solid fa-sliders" data-bs-toggle="modal" data-bs-target="#statusModal"></i></td>
        </tr>
      </tbody>
    </table>
  );
}

function StatusModal() {
  const { t } = useTranslation();
  return (
    <div className="modal fade" id="statusModal" tabIndex="-1" aria-labelledby="statusModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="statusModalLabel">{t("Changer Statut")}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <select className="form-select" id="statusSelect">
                  <option value="termine">{t("Terminé")}</option>
                  <option value="en-cours">{t("En Cours")}</option>
                  <option value="annule">{t("Annulé")}</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t("Fermer")}</button>
            <button type="button" className="btn btn-primary">{t("Enregistrer")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Commandes;
