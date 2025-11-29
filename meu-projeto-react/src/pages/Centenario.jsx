import React from "react";
import "../css/Centenario.css";
import Logo from "../assets/logo4.png"

export default function Centenario() {
    return (

        
        <div className="page">
            <div className="wrapper">

                {/* HEADER */}
                <header className="header">
                    <div className="header-container">
                        <div className="logo-circle">
                               <img src={Logo} alt="" />
                            </div>
                    </div>
                </header>

                {/* HERO */}
                <main className="main">
                    <section className="hero">
                        <div className="hero-grid">

                            <div className="hero-text">
                                <h1 className="hero-title">
                                    Bem-vindo ao <br /> Hospital Centenario.
                                </h1>

                                <p className="hero-subtitle">
                                    “No Hospital Centenário, acreditamos que cuidar vai muito além de tratar sintomas — é acolher histórias, ouvir com atenção e oferecer um atendimento que combina tecnologia, excelência e humanidade para cada paciente.”
                                </p>

                    

                                {/* FORM */}
                                
                            </div>

                            {/* IMAGE */}
                            <div className="hero-image-wrapper">
                                <img
                                    className="hero-image"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUgZ-O1_3a5jgt27qeSU9G7S4NAwzTuS9xdkGeWHCzpPeJwK-Q8Gj0lxpADlt2boy42sArdpN0z1iQ_Q5RmqMnnpYOQma5YZd4W1bHuR2ySH3goPfBFaGb0-gkIs1XLDmg0RIGV_qphIDBNxv4k3gI1kznNBhvSO0AE3xoyDQAoKcTR4PIDKB6y9MsDVozr5CFDNqBSHxRVZqkWegnas-3A6u2FX9tdjrzixm557EUKn8Guo4s8aSU9CVP7JPWxoXMr3GQTAp5JFFm"
                                    alt="Doctors"
                                />
                            </div>

              // Continuações dos elementos da página convertidos

                            <section className="departments">
                                <h2>Nossos Departamentos</h2>

                                <div className="dept-grid">
                                    <div className="dept-card">
                                        <img src="/img/cardiology.jpg" alt="Cardiologia" />
                                        <h3>Cardiologia</h3>
                                        <p>Tratamentos modernos com especialistas renomados.</p>
                                    </div>

                                    <div className="dept-card">
                                        <img src="/img/ortho.jpg" alt="Ortopedia" />
                                        <h3>Ortopedia</h3>
                                        <p>Atendimento completo para ossos, articulações e reabilitação.</p>
                                    </div>

                                    <div className="dept-card">
                                        <img src="/img/pediatrics.jpg" alt="Pediatria" />
                                        <h3>Pediatria</h3>
                                        <p>Cuidado humanizado para crianças e adolescentes.</p>
                                    </div>
                                </div>
                            </section>

                            <section className="contact-section" id="contact">
                                <h2>Contato</h2>

                                <form className="contact-form">
                                    <input type="text" placeholder="Seu nome" required />
                                    <input type="email" placeholder="Seu e-mail" required />
                                    <textarea placeholder="Sua mensagem" rows="5" required></textarea>
                                    <button>Enviar Mensagem</button>
                                </form>
                            </section>

                            <footer className="footer">
                                <p>© 2025 Alpha Hospital — Todos os direitos reservados.</p>
                            </footer>


                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
