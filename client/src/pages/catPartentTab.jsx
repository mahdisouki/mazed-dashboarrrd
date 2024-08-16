import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
function CategoryList() {
  // Get the location object
  const location = useLocation();

  // Access the cat object from the state
  const cat = location.state && location.state.cat;
  useEffect(()=>{
    console.log(location.state.cat)
  })
  const handleDelete = () => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      text: "Une fois supprimé(e), vous ne pourrez pas récupérer cet élément !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Non, annuler !",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Call deleteItem function
        deleteItem();
        Swal.fire("Supprimé(e) !", "Votre élément a été supprimé.", "secondary");
      } else {
        Swal.fire("Annulé", "Votre élément est en sécurité :)", "error");
      }
    });
  };

  const handleBan = () => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Êtes-vous sûr(e) ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Oui, désactivez-le !",
      cancelButtonText: "Non, annuler !",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Call activateDeactivateItem function
        activateDeactivateItem();
        Swal.fire(
          "Désactivé(e) !",
          "Votre élément a été désactivé.",
          "secondary"
        );
      } else {
        Swal.fire("Annulé", "Votre élément est en sécurité :)", "error");
      }
    });
  };

  const deleteItem = () => {
    // Implement your delete logic here
  };

  const activateDeactivateItem = () => {
    // Implement your activate/deactivate logic here
  };

  return (
    <div className="content-container">
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3"></i>
          </a>
        </header>

        <div className="page-heading">
          <div className="page-title">
            <div className="row">
              <div className="col-12 col-md-6 order-md-1 order-last">
                <p className="text-subtitle text-muted"></p>
              </div>
            </div>
          </div>

          <section className="section">
            <div className="row" id="table-head">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h2 className="new-price">Liste des catégories filles</h2>
                  </div>

                  <div className="card-content">
                    <div className="table-responsive">
                      <table className="table" id="table1">
                        <thead>
                          <tr>
                            <th>Libellé</th>
                            <th>Statut</th>
                            <th>Désactiver</th>
                            <th>Supprimer</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cat && cat.categories? cat.categories.map((item)=>(
                            <tr>
                            <td className="text-bold-500">{item?.libeléCategorie}</td>
                            <th><button class="btn btn-secondary">{item?.status}</button></th>
                            <td>
                              <i
                                className="fa-solid fa-ban"
                                onClick={handleBan}
                              ></i>
                            </td>
                            <td>
                              <i
                                className="fa-solid fa-trash deleteIcon"
                                onClick={handleDelete}
                              ></i>
                            </td>
                          </tr>
                          )):<div>loading</div>}
                          
                         
                        </tbody>
                      </table>
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

export default CategoryList;
