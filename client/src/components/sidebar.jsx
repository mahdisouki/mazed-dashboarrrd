import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "../css/sidebar.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Cookies from 'js-cookie'
const Theme = "light";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#F9F0D9",
      color: "#000",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#000",
      hover: {
        backgroundColor: "#F9B853",
        color: "#fff",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Playground = () => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [theme, setTheme] = useState(Theme);

  const toggleSidebar = () => {
    setToggled(!toggled);
  };
  // State to manage active link
  const [activeLink, setActiveLink] = useState("");

  const menuItemStyles = {
    root: {
      fontSize: "16px",
      fontWeight: 400,
      fontFamily: "Nunito",
    },
    icon: {
      color: themes[theme].menu.icon,
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
    }),
    button: {
      "&:hover": {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
    // Style for active link
    active: {
      backgroundColor: themes[theme].menu.hover.backgroundColor,
      color: themes[theme].menu.hover.color,
    },
  };

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <Sidebar
        style={{ overflowY: "auto" }}
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
        }}
      >
        <div className="header">
          <img className="logo" src="./log-mazed.png" alt="logo" />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                component={<Link to="/" />}
                icon={<i className="fa-solid fa-house"></i>}
                onClick={() => setActiveLink("/")}
                style={activeLink === "/" ? menuItemStyles.active : null}
              >
                {t("Tableau de bord")}
              </MenuItem>
              <SubMenu
                label={t("Super Admin")}
                icon={<i className="fa-solid fa-user-tie"></i>}
              >
                <MenuItem
                  component={<Link to="/CreationRole" />}
                  onClick={() => setActiveLink("/CreationRole")}
                  style={
                    activeLink === "/CreationRole" ? menuItemStyles.active : null
                  }
                >
                  {t("Creation D'un Role")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/ListeAdministrateur" />}
                  onClick={() => setActiveLink("/ListeAdministrateur")}
                  style={
                    activeLink === "/ListeAdministrateur"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Liste des administrateurs")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/CreationAdministrateur" />}
                  onClick={() => setActiveLink("/CreationAdministrateur")}
                  style={
                    activeLink === "/CreationAdministrateur"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Créer un Administrateur")}
                </MenuItem>
              </SubMenu>
              <SubMenu
                label={t("Demande")}
                icon={<i className="fa-solid fa-bookmark"></i>}
              >
                 <MenuItem
                    component={<Link to="/DemandeEnchereAdmin" />}
                    onClick={() => setActiveLink("/DemandeEnchereAdmin")}
                    style={
                      activeLink === "/DemandeEnchereAdmin"
                        ? menuItemStyles.active
                        : null
                    }
                  >
                    {t("Demande Enchére")}
                  </MenuItem>
                  <MenuItem
                    component={<Link to="/DemandeProduitAdmin" />}
                    onClick={() => setActiveLink("/DemandeProduitAdmin")}
                    style={
                      activeLink === "/DemandeProduitAdmin"
                        ? menuItemStyles.active
                        : null
                    }
                  >
                    {t("Demande category")}
                  </MenuItem>
                {/* <SubMenu label={t("Demande Vendeur")}>
                  <MenuItem
                    component={<Link to="/DemandeVendeurCreation" />}
                    onClick={() => setActiveLink("/DemandeVendeurCreation")}
                    style={
                      activeLink === "/DemandeVendeurCreation"
                        ? menuItemStyles.active
                        : null
                    }
                  >
                    {t("Demande de Création de Compte")}
                  </MenuItem>
                  <MenuItem
                    component={<Link to="/DemandeProduit" />}
                    onClick={() => setActiveLink("/DemandeProduit")}
                    style={
                      activeLink === "/DemandeProduit"
                        ? menuItemStyles.active
                        : null
                    }
                  >
                    {t("Demande Produit")}
                  </MenuItem>
                </SubMenu> */}
                
              </SubMenu>

              <SubMenu
                label={t("Catégories")}
                icon={<i className="fa-solid fa-layer-group"></i>}
              >
                <MenuItem
                  component={<Link to="/CreationCat" />}
                  onClick={() => setActiveLink("/CreationCat")}
                  style={
                    activeLink === "/CreationCat" ? menuItemStyles.active : null
                  }
                >
                  {t("Création de catégorie")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/ListeCat" />}
                  onClick={() => setActiveLink("/ListeCat")}
                  style={
                    activeLink === "/ListeCat" ? menuItemStyles.active : null
                  }
                >
                  {t("Liste de catégories")}
                </MenuItem>
              </SubMenu>
              {/* <SubMenu
                label={t("Produits")}
                icon={<i className="fa-solid fa-diamond"></i>}
              >
                <MenuItem
                  component={<Link to="/CreationProd" />}
                  onClick={() => setActiveLink("/CreationProd")}
                  style={
                    activeLink === "/CreationProd"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Création de produit")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/ProdListe" />}
                  onClick={() => setActiveLink("/ProdListe")}
                  style={
                    activeLink === "/ProdListe" ? menuItemStyles.active : null
                  }
                >
                  {t("Liste de produits")}
                </MenuItem>
              </SubMenu> */}
              <SubMenu
                label={t("Enchère")}
                icon={<i className="fa-solid fa-gavel"></i>}
              >
                <MenuItem
                  component={<Link to="/EnchèreCreation" />}
                  onClick={() => setActiveLink("/EnchèreCreation")}
                  style={
                    activeLink === "/EnchèreCreation"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Création de enchère")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/EnchereListe" />}
                  onClick={() => setActiveLink("/EnchereListe")}
                  style={
                    activeLink === "/EnchereListe"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Liste de enchère")}
                </MenuItem>
              </SubMenu>

              {/* <SubMenu
                label={t("Participants")}
                icon={<i className="fa-solid fa-users"></i>}
              >
                <MenuItem
                  component={<Link to="/CreationPart" />}
                  onClick={() => setActiveLink("/CreationPart")}
                  style={
                    activeLink === "/CreationPart"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Création d'un participant")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/PartListe" />}
                  onClick={() => setActiveLink("/PartListe")}
                  style={
                    activeLink === "/PartListe" ? menuItemStyles.active : null
                  }
                >
                  {t("Liste des participants")}
                </MenuItem>
              </SubMenu> */}
              {/* <SubMenu
                label={t("Vendeurs")}
                icon={<i className="fa-solid fa-user-clock"></i>}
              >
                <MenuItem
                  component={<Link to="/VendeurForm" />}
                  onClick={() => setActiveLink("/VendeurForm")}
                  style={
                    activeLink === "/VendeurForm" ? menuItemStyles.active : null
                  }
                >
                  {t("Création d'un vendeur")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/TableVendeurs" />}
                  onClick={() => setActiveLink("/TableVendeurs")}
                  style={
                    activeLink === "/TableVendeurs"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Liste des vendeurs")}
                </MenuItem>
              </SubMenu> */}
              <SubMenu
                label={t("Utilisateurs")}
                icon={<i className="fa-solid fa-user-check"></i>}
              >
                {/* <MenuItem
                  component={<Link to="/UtilisateurForm" />}
                  onClick={() => setActiveLink("/UtilisateurForm")}
                  style={
                    activeLink === "/UtilisateurForm"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Création d'un utilisateur")}
                </MenuItem> */}
                <MenuItem
                  component={<Link to="/TableUtilisateur" />}
                  onClick={() => setActiveLink("/TableUtilisateur")}
                  style={
                    activeLink === "/TableUtilisateur"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Liste des utilisateurs")}
                </MenuItem>
              </SubMenu>
              <SubMenu
                label={t("Annonces")}
                icon={<i className="fa-solid fa-volume-low"></i>}
              >
                <MenuItem
                  component={<Link to="/CreationAd" />}
                  onClick={() => setActiveLink("/CreationAd")}
                  style={
                    activeLink === "/CreationAd" ? menuItemStyles.active : null
                  }
                >
                  {t("Création d'une annonce")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/ListeAds" />}
                  onClick={() => setActiveLink("/ListeAds")}
                  style={
                    activeLink === "/ListeAds" ? menuItemStyles.active : null
                  }
                >
                  {t("Liste des annonce")}
                </MenuItem>
              </SubMenu>
              <SubMenu
                label={t("Questions fréquents")}
                icon={<i className="fa-solid fa-file-circle-question"></i>}
              >
                <MenuItem
                  component={<Link to="/QuestionForm" />}
                  onClick={() => setActiveLink("/QuestionForm")}
                  style={
                    activeLink === "/QuestionForm"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Création d'un question")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/QuestionList" />}
                  onClick={() => setActiveLink("/QuestionList")}
                  style={
                    activeLink === "/QuestionList"
                      ? menuItemStyles.active
                      : null
                  }
                >
                  {t("Liste des questions")}
                </MenuItem>
              </SubMenu>
              {/* <SubMenu
                label={t("Termes et conditions")}
                icon={<i className="fa-solid fa-clipboard"></i>}
              >
                <MenuItem
                  component={<Link to="/TermsForm" />}
                  onClick={() => setActiveLink("/TermsForm")}
                  style={
                    activeLink === "/TermsForm" ? menuItemStyles.active : null
                  }
                >
                  {t("Création d'un terme")}
                </MenuItem>
                <MenuItem
                  component={<Link to="/TermesList" />}
                  onClick={() => setActiveLink("/TermesList")}
                  style={
                    activeLink === "/TermesList" ? menuItemStyles.active : null
                  }
                >
                  {t("Termes et conditions")}
                </MenuItem>
              </SubMenu> */}
            </Menu>

            <Menu menuItemStyles={menuItemStyles}>
              {/* <MenuItem
                component={<Link to="/Réclamations" />}
                icon={<i className="fa-solid fa-circle-exclamation"></i>}
                onClick={() => setActiveLink("/Réclamations")}
                style={
                  activeLink === "/Réclamations" ? menuItemStyles.active : null
                }
              >
                {t("Réclamations")}
              </MenuItem> */}
              <MenuItem
                component={<Link to="/Transferts" />}
                icon={<i className="fa-solid fa-right-left"></i>}
                onClick={() => setActiveLink("/Transferts")}
                style={
                  activeLink === "/Transferts" ? menuItemStyles.active : null
                }
              >
                {t("Demandes de transferts")}
              </MenuItem>
              <MenuItem
                component={<Link to="/Cartes" />}
                icon={<i className="fa-solid fa-credit-card"></i>}
                onClick={() => setActiveLink("/Cartes")}
                style={activeLink === "/Cartes" ? menuItemStyles.active : null}
              >
                {t("Cartes recharges")}
              </MenuItem>
              <MenuItem
                component={<Link to="/echeances" />}
                icon={<i className="fa-solid fa-credit-card"></i>}
                onClick={() => setActiveLink("/echeances")}
                style={activeLink === "/echeances" ? menuItemStyles.active : null}
              >
                {t("echeances")}
              </MenuItem>
              <MenuItem
                component={<Link to="/winners" />}
                icon={<i className="fa-solid fa-credit-card"></i>}
                onClick={() => setActiveLink("/winners")}
                style={activeLink === "/winners" ? menuItemStyles.active : null}
              >
                {t("gagnants")}
              </MenuItem>
              {/* <MenuItem
                component={<Link to="/Commandes" />}
                icon={<i className="fa-solid fa-bag-shopping"></i>}
                onClick={() => setActiveLink("/Commandes")}
                style={
                  activeLink === "/Commandes" ? menuItemStyles.active : null
                }
              >
                {t("Commandes")}
              </MenuItem> */}
              <MenuItem
                component={<Link to="/Tutoriel" />}
                icon={<i class="fa-solid fa-video"></i>}
                onClick={() => setActiveLink("/Tutoriel")}
                style={
                  activeLink === "/Tutoriel" ? menuItemStyles.active : null
                }
              >
                {t("Tutoriel")}
              </MenuItem>
              <MenuItem
              icon={<i class="fa-solid fa-bell"></i>}
                  component={<Link to="/notification" />}
                  onClick={() => setActiveLink("/notification")}
                  style={
                    activeLink === "/notification" ? menuItemStyles.active : null
                  }
                >
                  {t("Notifications")}
                </MenuItem>
              <MenuItem
                icon={<i className="fa-solid fa-right-from-bracket"></i>}
              >
                <button onClick={()=>{Cookies.remove('token') ; window.location.reload()}}>{t("Déconnexion")}</button>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>

      <main style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <button
                className="sb-button"
                onClick={toggleSidebar}
                style={{ marginRight: "auto" }}
              >
                <i className="fa-solid fa-bars"></i>
              </button>
            )}
          </div>
          <div style={{ marginBottom: "48px" }}>
            <div style={{ padding: "0 8px" }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 16 }}></div>
                    <div style={{ marginBottom: 16 }}></div>
                    <div style={{ marginBottom: 16 }}></div>
                    <div style={{ marginBottom: 16 }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Playground;
