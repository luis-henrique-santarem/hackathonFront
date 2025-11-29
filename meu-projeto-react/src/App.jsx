import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend,} from "chart.js";
import "./App.css";
import Logo from "./assets/logo.png"

ChartJS.register(ArcElement, Tooltip, Legend);

const setores = [
  { nome: "Emergência Adultos", leitos: 39, ocupados: 39 },
  { nome: "Emergência Pediátrica", leitos: 16, ocupados: 10 },
  { nome: "Leitos Clínicos", leitos: 119, ocupados: 88 },
  { nome: "Leitos Pediátricos", leitos: 17, ocupados: 11 },
  { nome: "UTI Adulto", leitos: 16, ocupados: 12 },
  { nome: "UTI Neonatal", leitos: 10, ocupados: 7 },
];

function Pizza({ usado, total }) {
  const livres = total - usado;

  const data = {
    labels: ["Ocupados", "Livres"],
    datasets: [
      {
        data: [usado, livres],
        backgroundColor: ["#ff7b7b", "#59e0c1"],
        borderColor: "transparent",
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    cutout: "68%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1b1b1b",
        titleColor: "#fff",
        bodyColor: "#ddd",
        padding: 10,
      },
    },
  };

  return <Pie data={data} options={options} />
}

export default function App() {
  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-content fade-in">
          <img
            src={Logo}
            alt="Logo"
            className="logo"
          />
        </div>
      </nav>
      <section className="hero fade-in-up">
        <h1 className="hero-title">
          Ocupação de Leitos
          <span>Hospital Centenário</span>
        </h1>

        <p className="hero-subtitle">
          Monitoramento atualizado da capacidade hospitalar em tempo real.
        </p>
      </section>
      <div className="grid fade-in-up-delayed">
        {setores.map((s, i) => (
          <div key={i} className="card">
            <div className="chart-wrapper">
              <Pizza usado={s.ocupados} total={s.leitos} />
            </div>

            <p className="setor-nome">{s.nome}</p>

            <div className="info-box">
              <p>Leitos: <b>{s.leitos}</b></p>
              <p>Ocupados: <b>{s.ocupados}</b></p>
            </div>
          </div>
        ))}
      </div>

      <footer className="footer fade-in-up-delayed">
        © 2025 • Hospital Centenário
      </footer>
    </div>
  )
}