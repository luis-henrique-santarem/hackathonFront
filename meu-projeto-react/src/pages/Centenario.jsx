import React from "react";
import "../css/Centenario.css";
import Logo from "../assets/logo4.png";

export default function Centenario() {
    return (
        <div className="page">
            <div className="wrapper">

                {/* ================= HEADER ================= */}
                <header className="header">
                    <div className="header-container">
                        <div className="logo-circle">
                            <img src={Logo} alt="Logo Hospital" />
                        </div>
                    </div>
                </header>

                {/* ================= HERO ================= */}
                <main className="main">
                    <section className="hero">
                        <div className="hero-grid">

                            {/* Text */}
                            <div className="hero-text">
                                <h1 className="hero-title">
                                    Bem-vindo ao <br /> Hospital Centenário.
                                </h1>

                                <p className="hero-subtitle">
                                    “No Hospital Centenário, acreditamos que cuidar vai muito além
                                    de tratar sintomas — é acolher histórias, ouvir com atenção e
                                    oferecer um atendimento que combina tecnologia, excelência e
                                    humanidade para cada paciente.”
                                </p>
                            </div>

                            {/* Image */}
                            <div className="hero-image-wrapper">
                                <img
                                    className="hero-image"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUgZ-O1_3a5jgt27qeSU9G7S4NAwzTuS9xdkGeWHCzpPeJwK-Q8Gj0lxpADlt2boy42sArdpN0z1iQ_Q5RmqMnnpYOQma5YZd4W1bHuR2ySH3goPfBFaGb0-gkIs1XLDmg0RIGV_qphIDBNxv4k3gI1kznNBhvSO0AE3xoyDQAoKcTR4PIDKB6y9MsDVozr5CFDNqBSHxRVZqkWegnas-3A6u2FX9tdjrzixm557EUKn8Guo4s8aSU9CVP7JPWxoXMr3GQTAp5JFFm"
                                    alt="Médicos"
                                />
                            </div>

                        </div>
                    </section>

                    {/* ================= DEPARTAMENTOS ================= */}
                    <section className="departments">
                        <h2>Noticias</h2>

                        <div className="dept-grid">
                            <div className="dept-card">
                                <img src="/img/cardiology.jpg" alt="" />
                                <h3>Centenário entrega nova estrutura...</h3>
                                <p>O Hospital Centenário está com uma nova estrutura na sala de medicação. Na manhã desta terça-feira, 21, foram instaladas e já estão em uso novas poltronas, televisão e bebedouro para acolhimento da emergência do serviço. O objetivo é oferecer mais conforto aos pacientes que buscam atendimento. “Estamos entregando uma nova sala reformulada e com estrutura adequada para atender os pacientes”, ressalta o presidente da Fundação Hospital Centenário, Diego Cardoso da Silveira.

                                    Texto: Neemias Freitas – MTb 13.247

                                    Foto: Neemias Freitas</p>
                            </div>

                            <div className="dept-card">
                                <img src="/img/ortho.jpg" alt="" />
                                <h3>Acidentes de trânsito respondem por um terço dos casos em UTI no Hospital Centenário</h3>
                                <p>
                                    O Hospital Centenário está em alerta devido ao grande volume de atendimentos a vítimas de acidentes de trânsito. A situação é de alerta. Na manhã desta terça-feira, 2, cinco dos 16 leitos da Unidade de Terapia Intensiva (UTI) da instituição estão ocupados por pacientes que sofreram lesões graves em colisões e atropelamentos
                                </p>
                            </div>

                            <div className="dept-card">
                                <img src="/img/pediatrics.jpg" alt="" />
                                <h3>                                 Encontro reúne mais de 60 gestantes no Hospital Centenário
                                </h3>
                                <p>
                                    Foram mais de 60 gestantes – de Dois irmãos, Ivoti, Estância Velha e São Leopoldo – que tiveram a oportunidade de receber orientações sobre o cuidado com o recém-nascido e o aleitamento materno além de conhecer como funciona a estrutura da maternidade, centro obstétrico e a UTI neonatal.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ================= FEATURE CARDS ================= */}
                    <section className="features">
                        <div className="feature-card">

                            <h3>kdadkka</h3>
                            <p>blabalba</p>
                        </div>

                        <div className="feature-card">

                            <h3>msadmas.k</h3>
                            <p>amklsmdk</p>
                        </div>

                        <div className="feature-card selected">

                            <h3>Afksmdlkable</h3>
                            <p>sdklsam</p>
                        </div>

                        <div className="feature-card">

                            <h3>Tofklmlity</h3>
                            <p>fdmlm</p>
                        </div>
                    </section>

                </main>
            </div>

            {/* ================= FOOTER ================= */}
            <footer className="footer">
                <p>© 2025 Hospital Centenário — Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
