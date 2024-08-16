import React from "react";

function ModificationDetailsEnchere() {
  return (
    <div className="content-container">
      <section id="main">
        <form action="#">
          <div className="modal-body">
            <h2>Modification </h2>
            <br />
            <label htmlFor="Nom ">Nom de famille : </label>
            <div className="form-group">
              <input
                id="Nom "
                type="text"
                placeholder="Ecrire Ici"
                className="form-control"
              />
            </div>
            <label htmlFor="Prénom">Prénom : </label>
            <div className="form-group">
              <input
                id="Prénom"
                type="text"
                placeholder="Ecrire Ici"
                className="form-control"
              />
            </div>
            <label htmlFor="Pseudo">Pseudo : </label>
            <div className="form-group">
              <input
                id="Pseudo"
                type="text"
                placeholder="Ecrire Ici"
                className="form-control"
              />
            </div>
            <label htmlFor="Num">Num télé : </label>
            <div className="form-group">
              <input
                id="Num"
                type="number"
                placeholder="Ecrire Ici"
                className="form-control"
              />
            </div>
            <label htmlFor="date">Date de Participation : </label>
            <div className="form-group">
              <input
                id="date"
                type="date"
                placeholder="Ecrire Ici"
                className="form-control"
              />
            </div>
            <label htmlFor="nombre">Nb d'encheres y liées : </label>
            <div className="form-group">
              <input
                id="nombre"
                type="number"
                placeholder="Ecrire Ici"
                className="form-control"
              />
            </div>
            <label htmlFor="date">Lien page détails : </label>
            <div className="form-group">
              <input
                id="Pseudo"
                type="text"
                placeholder="Ecrire Ici"
                className="form-control"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light-secondary"
              data-bs-dismiss="modal"
            >
              <i className="bx bx-x d-block d-sm-none" />
              <span className="d-none d-sm-block">Close</span>
            </button>
            <button
              type="button"
              className="btn btn-primary ms-1"
              data-bs-dismiss="modal"
            >
              <i className="bx bx-check d-block d-sm-none" />
              <span className="d-none d-sm-block">login</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ModificationDetailsEnchere;
