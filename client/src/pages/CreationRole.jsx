import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Choices from "choices.js";
import axios from "axios";
import { GlobalState } from "../GlobalState";
import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie'
function CreationRole() {
  const token = Cookies.get('token');
  const [isEnabled, setIsEnabled] = useState(false);
  const [data , setData] = useState({roleName:"" , permissionNames:[]})
  const [inputs, setInputs] = useState([]);
  const state = useContext(GlobalState);
  const permissions = state.Permissions;
  console.log("ppp:" , permissions)
  const { t } = useTranslation();
  useEffect(() => {
    console.log("cat from here", permissions);
    const select = new Choices("#category-select", {
      removeItemButton: true,
      placeholder: true,
      placeholderValue: "Select an option",
      shouldSort: false,
    });

    const handleSelectChange = () => {
      const hasSelection = select.getValue().length > 0;
      setIsEnabled(hasSelection);
      if (!hasSelection) {
        setInputs([]);
      }
    };

    select.passedElement.element.addEventListener("change", handleSelectChange);

    return () => {
      select.passedElement.element.removeEventListener(
        "change",
        handleSelectChange
      );
      select.destroy();
    };
  }, [permissions]);
  

  const createRole = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axios.post(
        "http://localhost:8081/admin/create-role",
        data ,{headers : {Authorization: `Bearer ${token}`} }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePermissionChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setData({ ...data, permissionNames: selectedOptions });
  };

  return (
    <div>
      <div id="main">
        <header className="mb-3">
          <a href="#" className="burger-btn d-block d-xl-none">
            <i className="bi bi-justify fs-3" />
          </a>
        </header>
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="new-price">{t("Créer un rôle")}</h2>
              <div id="add-input-button-container" />
              {/* + Button */}
            </div>
            <div className="card-content">
              <div className="card-body">
                <form className="form form-vertical" onSubmit={createRole}>
                  <div className="form-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="role-name">{t("Nom du rôle")}</label>
                          <input
                            type="text"
                            id="role-name"
                            className="form-control"
                            name="roleName"
                            maxLength={25}
                            onChange={(e) =>
                              setData({ ...data, roleName: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group" style={{ marginBottom: "15px" }}>
                <label htmlFor="category-select">{t("Permission")}</label>
                <select
                  id="category-select"
                  className="choices form-select multiple-remove"
                  multiple
                  onChange={handlePermissionChange}
                >
                  <option disabled>default</option>
                 {permissions&& permissions.map((item)=>(
                  <option value={item.name}>{item.name}</option>
                 ))}
                </select>
              </div>
                      <br />
                      <br />
                      <br />
                      <br />
                      <div className="col-12 d-flex justify-content-end">
                        <button
                          type="reset"
                          className="btn btn-secondary me-1 mb-1"
                        >
                          {t("Annuler")}
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary me-1 mb-1"
                        >
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

export default CreationRole;
