import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.net",
    phone: "083xxxxxxxxx",
    // Ensure these state values are initialized to avoid undefined errors
    birthday: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="content-container">
    <section className="section">
      <div className="row">
        <div className="col-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="avatar avatar-xl">
                  <img
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "5px",
                    }}
                    src="assets/static/images/faces/2.jpg"
                    alt="Avatar"
                  />
                </div>
                <h3 className="mt-3">John Doe</h3>
                <p className="text-small">Junior Software Engineer</p>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      {t("Nom et Prénom")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      {t("Email")}
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      {t("Numéro de téléphone")}
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="form-control"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                    {t("Enregister")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="new-price">{t("Changer le mot de passe")}</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                  <label htmlFor="current_password" className="form-label">
                  {t("Mot de passe actuel")}
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="current_password"
                    className="form-control"
                    placeholder="Enter your current password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="newPassword" className="form-label">
                  {t("Nouveau mot de passe")}
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="form-control"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="confirmPassword" className="form-label">
                  {t("Confirmer le mot de passe")}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control"
                    placeholder="Enter confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group my-2 d-flex justify-content-start">
                  <button type="submit" className="btn btn-primary">
                  {t("Enregister")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Profile;
