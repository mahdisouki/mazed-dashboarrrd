import React from "react";
import ReactApexChart from "react-apexcharts";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Remove the download button
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    colors: ["#b0210e"],
  };

  const chartSeries = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  return (
    <div id="main" className="container-fluid content-container">
      <div className="page-content">
        <section className="row g-3 mb-4">
          <div className="col-12 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body px-4 py-4-5">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="stats-icon purple mb-2">
                      <i className="fa-solid fa-download"></i>
                    </div>
                  </div>
                  <div className="col">
                    <h6 className="text-muted stats-text">
                      {t("Nombre d'installation")}
                    </h6>
                    <h6 className="stats-number mb-0">112.000</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body px-4 py-4-5">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="stats-icon blue mb-2">
                      <i className="fa-solid fa-trash-can"></i>
                    </div>
                  </div>
                  <div className="col">
                    <h6 className="text-muted stats-text">
                      {t("Nombre de désinstallations")}
                    </h6>
                    <h6 className="stats-number mb-0">183.000</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-body px-4 py-4-5">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <div className="stats-icon green mb-2">
                      <i className="fa-solid fa-user-plus"></i>
                    </div>
                  </div>
                  <div className="col">
                    <h6 className="text-muted stats-text">
                      {t("Nombre d'inscriptions")}
                    </h6>
                    <h6 className="stats-number mb-0">80.000</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="row g-3">
          <div className="col-12 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h4>{t("Traffic sur les produits")}</h4>
              </div>
              <div className="card-body">
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h4>{t("Traffic sur les enchères")}</h4>
              </div>
              <div className="card-body">
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h4>{t("Traffic sur les catégories")}</h4>
              </div>
              <div className="card-body">
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
