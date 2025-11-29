import React, { useState } from "react";
import "./mapa.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

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
        <div className="card card-large">
          <h3 className="card-title">Planta do Hospital</h3>

          <div className="map-wrapper">
            <img
              src={plantaImg}
              alt="Planta do Hospital"
              className="hospital-map-img"
            />
            <div
              className="map-zone zone-red"
              onMouseMove={(e) => handleZoneHover("Emergência — Vermelho", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            <div
              className="map-zone zone-orange"
              style={{

              }}
              onMouseMove={(e) => handleZoneHover("Risco Alto — Laranja", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            <div
              className="map-zone zone-yellow"
              onMouseMove={(e) => handleZoneHover("Moderado — Amarelo", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            <div
              className="map-zone zone-green"
              style={{

              }}
              onMouseMove={(e) => handleZoneHover("Baixo Risco — Verde", e)}
              onMouseLeave={handleZoneLeave}
            ></div>

            <div
              className="map-zone zone-blue"
              onMouseMove={(e) => handleZoneHover("Não Urgente — Azul", e)}
              onMouseLeave={handleZoneLeave}
            ></div>
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
      </div>
      <div className="card card-manchester">
        <h3 className="card-title">Classificação Manchester</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={manchesterData}>
              <XAxis type="category" dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4c88ff" radius={[8, 8, 0, 0]}>
                {manchesterData.map((item, i) => (
                  <Cell key={i} fill={item.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}