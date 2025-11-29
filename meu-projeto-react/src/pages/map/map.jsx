import React, { useState } from "react";
import "./mapa.css";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
} from "recharts";

import plantaImg from "../../assets/planta-hospital.jpg";



export default function Mapa() {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const manchesterData = [
    { name: "Vermelho", value: 10, color: "#ff4c4c" },
    { name: "Laranja", value: 25, color: "#ff9f2d" },
    { name: "Amarelo", value: 40, color: "#ffe25d" },
    { name: "Verde", value: 20, color: "#6dd56d" },
    { name: "Azul", value: 5, color: "#4c88ff" },
  ];

  const atendimentoData = [
    { setor: "Emergência", pacientes: 42 },
    { setor: "UTI", pacientes: 18 },
    { setor: "Internação", pacientes: 31 },
    { setor: "Imagem", pacientes: 12 },
  ];

  const handleZoneHover = (zoneName, e) => {
    setHoveredZone(zoneName);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleZoneLeave = () => {
    setHoveredZone(null);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">

        {/* ================= MAPA ================= */}
        <div className="card card-large">
          <h3 className="card-title">Planta do Hospital</h3>

          <div className="map-wrapper">
            <img src={plantaImg} alt="Planta do Hospital" className="hospital-map-img" />

            {/* Zonas clicáveis */}
            <div
              className="map-zone zone-red"
              style={{ top: "18%", left: "18%", width: "15%", height: "20%" }}
              onMouseMove={(e) => handleZoneHover("Emergência — Vermelho", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            <div
              className="map-zone zone-orange"
              style={{ top: "45%", left: "23%", width: "16%", height: "18%" }}
              onMouseMove={(e) => handleZoneHover("Risco Alto — Laranja", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            <div
              className="map-zone zone-yellow"
              style={{ top: "30%", left: "45%", width: "15%", height: "18%" }}
              onMouseMove={(e) => handleZoneHover("Moderado — Amarelo", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            <div
              className="map-zone zone-green"
              style={{ top: "60%", left: "48%", width: "15%", height: "20%" }}
              onMouseMove={(e) => handleZoneHover("Baixo Risco — Verde", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            <div
              className="map-zone zone-blue"
              style={{ top: "65%", left: "67%", width: "16%", height: "20%" }}
              onMouseMove={(e) => handleZoneHover("Não Urgente — Azul", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            {/* Tooltip */}
            {hoveredZone && (
              <div
                className="tooltip"
                style={{ top: tooltipPos.y + 10, left: tooltipPos.x + 10 }}
              >
                {hoveredZone}
              </div>
            )}
          </div>
        </div>

        {/* ========== GRÁFICO MANCHESTER ========== */}
        <div className="card">
          <h3 className="card-title">Classificação Manchester</h3>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={manchesterData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="45%"
                  outerRadius="70%"
                  paddingAngle={4}
                >
                  {manchesterData.map((item, i) => (
                    <Cell key={i} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ========== GRÁFICO SETORES ========== */}
        {/* <div className="card">
          <h3 className="card-title">Pacientes por Setor</h3>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={atendimentoData}>
                <XAxis dataKey="setor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pacientes" fill="#4c88ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div> */}

      </div>
    </div>
  );
}