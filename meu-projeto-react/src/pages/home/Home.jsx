import axios from "axios"
import "./home.css"
import Logo from "../../assets/logo4.png"
import { AppWindow, HomeIcon, LayoutDashboard } from "lucide-react"
import Mapa from "../map/map"
import { useEffect, useState } from "react"



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


const createSetor = async ({ nome_setor, tipo_setor }) => {
    try {
        const created = await axios.post("http://localhost:3500/setor", { nome_setor, tipo_setor })
        toast.success(created.data.message)
        return created
    }
    catch (e) {
        toast.error(e.message)
    }

}

const createUser = async ({ nome, cpf, numero_telefone, senha }) => {
    try {
        const created = await axios.post("http://localhost:3500/usuario", { nome, cpf, numero_telefone, senha })
        toast.success(created.data.message)
        return created
    }
    catch (e) {
        toast.error(e.message)
    }

}

const updateUser = async ({ id_usuario, data }) => {
    try {
        const updated = await axios.put("http://localhost:3500/usuario/" + id_usuario, data)
        toast.success(updated.data.message)
        return updated.data.data

    }
    catch (e) {
        toast.error(e.message)
    }
}

const deleteUser = async ({ id_usuario }) => {
    try {
        const deleted = await axios.delete("http://localhost:3500/usuario/" + id_usuario)
        toast.success(deleted.data.message)
    }

    catch (e) {
        toast.error(e.message)
    }
}
const deleteSetor = async ({ id_setor }) => {
    try {
        const deleted = await axios.delete("http://localhost:3500/setor/" + id_setor)
        toast.success(deleted.data.message)
    }

    catch (e) {
        toast.error(e.message)
    }
}

const getUsers = async () => {
    try {
        return (await axios.get("http://localhost:3500/usuario")).data
    }
    catch (e) {
        toast.error(e.message)
    }
}
const getSetores = async () => {
    try {
        return (await axios.get("http://localhost:3500/setor")).data
    }
    catch (e) {
        toast.error(e.message)
    }
}
const getLeitos = async () => {
    try {
        return (await axios.get("http://localhost:3500/leito")).data
    }
    catch (e) {
        toast.error(e.message)
    }
}

const updateSetor = async ({ id_setor, data }) => {
    try {
        const updated = await axios.put("http://localhost:3500/setor/" + id_setor, data)
        toast.success(updated.data.message)
        return updated.data.data

    }
    catch (e) {
        toast.error(e.message)
    }
}



async function getDataForDashBoard() {
    try {
        const data = await getSetores();

        return data.map((s) => ({
            setor: `${s.tipo_setor}`,
            leitos: Array.isArray(s.leitos) ? s.leitos.length : 0
        }));
    } catch (error) {
        console.error("Erro ao buscar setores:", error);
        return []; // Retorna array vazio em caso de erro
    }
}


import { Bed, User, Hospital } from "lucide-react";

export function LeitoCard({leitos}) {
    return (
        <div className="leito-grid">
            {leitos.map((leito) => (
                <div className="leito-card" style={{
                    position: "relative"
                }} key={leito.id_leito}>

                    <div className="leito-card-header">
                        <Bed size={22} strokeWidth={1.7} />
                        <h3>Leito</h3>
                    </div>

                    <div style={{
                        borderRadius: "100%",
                        position: "absolute",
                        right: 20,
                        top: 20,
                        width: "10px",
                        height: "10px",
                        backgroundColor: leito.usuario ? "red" : "green"
                    }}></div>



                    <div className="leito-info">
                        <div className="leito-info-item">
                            <Hospital size={18} />
                            <span><strong>Setor:</strong> {leito.setor?.nome_setor}</span>
                        </div>

                        <div className="leito-info-item">
                            <Hospital size={18} />
                            <span><strong>Tipo:</strong> {leito.setor?.tipo_setor}</span>
                        </div>

                        <div className="leito-info-item">
                            <User size={18} />
                            <span>
                                <strong>Ocupado por:</strong> {leito.usuario ? leito.usuario.nome : "Vazio"}
                            </span>
                        </div>
                    </div>

                    <button className="btn-manage">Gerenciar</button>
                </div>
            ))}
        </div>
    );
}




export default function Home() {
    const [clientModalOpen, setClientModal] = useState(false)
    const [clientUpdateModalOpen, setClientUpdateModal] = useState(false)
    const [section, setSection] = useState("dashboard")
    const [setorModal, setSetorModal] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedUser, setUser] = useState(null)
    const [setores, setSetores] = useState([])
    const [selectedSetor, setSetor] = useState(null)
    const [updatedModalSetor, setUpdatedModalSetor] = useState(null)
    const [leitos, setLeitos] = useState([])
    const [leitoCreateModal, setLeitoCreateModal] = useState(false)
    const [leitoUpdateModal, setLeitoUpdateModal] = useState(false)
    const [leitoSelected, setLeitoSelected] = useState(null)
    const [openModalUsers, setOpenModalUsers] = useState(false)
    const [selectdUser, setSelectdUser] = useState(null)
    const [openSetoresModal, setSetoresModal] = useState(false)
    const [dashboardValues, setDashboardValues] = useState([])


    useEffect(() => {
        const get = async () => {
            setDashboardValues(await getDataForDashBoard())
        }

        get()
    }, [])


    console.log(dashboardValues)
    useEffect(() => {
        const get = async () => {
            const users = await getUsers()
            setUsers(users)
        }

        get()
    }, [])

    useEffect(() => {
        const get = async () => {
            const setores = await getSetores()
            setSetores(setores)
        }

        get()
    }, [])

    useEffect(() => {
        const get = async () => {
            const leitos = await getLeitos()
            setLeitos(leitos)
        }

        get()
    }, [])


    return (
        <main className="main-content">



            <ModalUsers
                users={users}
                open={openModalUsers}
                onSelect={(user) => {
                    setSelectdUser(user);      // salva usuário selecionado
                    setOpenModalUsers(false);  // fecha modal de usuários
                    setSetoresModal(true);     // abre modal de setores
                }}
                onClose={() => setOpenModalUsers(false)}
            />

            <ModalSetores
                onSelect={(data) => {
                    setSelectdUser(data.user)
                    setSetor(data.setor)
                    setSetoresModal(false)
                    setLeitoCreateModal(true)
                }}
                open={openSetoresModal}
                setores={setores}
                onClose={() => setSetoresModal(false)}
                user={selectdUser}
            />

            <ModalLeito
                open={leitoCreateModal}
                user={selectdUser}
                setor={selectedSetor}
                onClose={() => {
                    setLeitoCreateModal(false)
                }}
                onSubmit={() => {

                }}
            />
            <ModalCliente open={clientModalOpen} onSubmit={async (data) => {
                await createUser(data)
                setUsers(prev => [...prev, data])
            }} onClose={() => { setClientModal(prev => !prev) }} />



            <ModalUpdateCliente
                open={clientUpdateModalOpen}
                onClose={() => setClientUpdateModal(false)}
                onSubmit={async (data) => {
                    const updatedUser = await updateUser({ id_usuario: selectedUser.id_usuario, data });
                    setUsers(prev =>
                        prev.map((p) => {
                            return p.id_usuario === updatedUser.id_usuario ? updatedUser : p
                        })
                    );
                    setClientUpdateModal(false);
                }}
                user={selectedUser}
            />


            <ModalSetor
                open={setorModal}
                onClose={() => {
                    setSetorModal(false)
                }}
                onSubmit={async (data) => {
                    await createSetor(data)
                    setSetores(prev => [...prev, data])
                }}
            />

            <ModalUpdateSetor
                open={updatedModalSetor}
                onClose={() => {
                    setUpdatedModalSetor(false)
                }}
                onSubmit={async (data) => {
                    const updated = await updateSetor({ id_setor: selectedSetor.id_setor, data })
                    setSetores(prev =>
                        prev.map((setor) => {
                            return setor.id_setor === updated.id_setor ? updated : setor
                        })
                    );
                    setUpdatedModalSetor(false);
                }}
                setor={selectedSetor}

            />

            <div className="container">
                <div className="side_menu">
                    <div className="menu-header-image">

                        <h3>Senac apresenta</h3>
                        <h1>CENTENARIO</h1>
                        <span>DASHBOARD</span>

                    </div>

                    <div className="separator"></div>

                    <div className="menu_itens">
                        <div className="card_item">
                            <LayoutDashboard />
                            <h1>Home</h1>
                        </div>
                        <div className="card_item">
                            <AppWindow />
                            <h1>Site</h1>
                        </div>
                        <div className="card_item">
                            <HomeIcon />
                            <h1>Home</h1>
                        </div>

                    </div>
                </div>



                <div className="side_main">
                    <div className="side_content">
                        <div className="header_main">
                            <button onClick={() => { setClientModal(prev => !prev) }}>Registrar Paciente</button>
                            <button onClick={() => { setSetorModal(prev => !prev) }}>Registrar Setor</button>
                            <button onClick={() => {
                                setOpenModalUsers(true)
                            }}>Registrar Leito</button>
                        </div>

                        <div className="card_chart_towers">
                            <div className="card_chart_section">
                                <button onClick={() => setSection("dashboard")}>DashBoard</button>
                                <button onClick={() => setSection("users")}>Pacientes</button>
                                <button onClick={() => setSection("leitos")}>Leitos</button>
                                <button onClick={() => setSection("setores")}>Setores</button>
                            </div>

                            {section === "dashboard" && (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dashboardValues}>
                                        <XAxis dataKey="setor" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="leitos" fill="#4c88ff" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}


                            {/* Componente para lista de usuários */}
                            {section === "users" && (
                                <div className="users_list">
                                    <table className="users_table">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>CPF</th>
                                                <th>Telefone</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id_usuario}>
                                                    <td>{user.nome}</td>
                                                    <td>{user.cpf}</td>
                                                    <td>{user.numero_telefone}</td>
                                                    <td>
                                                        <button className="btn edit"
                                                            onClick={() => {
                                                                setClientUpdateModal(true)
                                                                setUser(user)
                                                            }}
                                                        >Editar</button>
                                                        <button className="btn delete"
                                                            onClick={async () => {
                                                                await deleteUser({ id_usuario: user.id_usuario })
                                                                setUsers(prev => {
                                                                    return prev.filter(u => u.id_usuario != user.id_usuario)
                                                                })
                                                            }}
                                                        >Excluir</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


                            )}

                            {section === "leitos" && (
                                <LeitoCard leitos={leitos}/>
                            )}

                            {/* Componente para lista de usuários */}
                            {section === "setores" && (
                                <div className="users_list">
                                    <table className="users_table">
                                        <thead>
                                            <tr>
                                                <th>Nome_Setor</th>
                                                <th>Tipo_Setor</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {setores.map((setor) => (
                                                <tr key={setor.id_setor}>
                                                    <td>{setor.nome_setor}</td>
                                                    <td>{setor.tipo_setor}</td>

                                                    <td>
                                                        <button className="btn edit"
                                                            onClick={() => {
                                                                setSetor(setor)
                                                                setUpdatedModalSetor(true)

                                                            }}
                                                        >Editar</button>
                                                        <button className="btn delete"
                                                            onClick={async () => {
                                                                await deleteSetor({ id_setor: setor.id_setor })
                                                                setSetores(prev => {
                                                                    return prev.filter(s => s.id_setor !== setor.id_setor)
                                                                })
                                                            }}
                                                        >Excluir</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>


                            )}



                        </div>


                        



                    </div>
                </div>

            </div>

        </main>
    )
}



import "./modalCliente.css";
import { toast } from "react-toastify"




export function ModalUpdateCliente({ open, onClose, onSubmit, user }) {
    if (!open) return null;

    const [formData, setFormData] = useState({
        nome: "",
        cpf: "",
        numero_telefone: "",
        senha: ""
    });

    // Preenche o formulário com os valores do usuário quando o modal abre
    useEffect(() => {
        if (user) {
            setFormData({
                nome: user.nome || "",
                cpf: user.cpf || "",
                numero_telefone: user.numero_telefone || "",
                senha: "" // senha geralmente não é exibida
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Editar Cliente</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>CPF</label>
                        <input
                            type="text"
                            name="cpf"
                            maxLength="11"
                            value={formData.cpf}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Número de Telefone</label>
                        <input
                            type="text"
                            name="numero_telefone"
                            value={formData.numero_telefone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn cancel" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit" className="btn confirm">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export function ModalCliente({ open, onClose, onSubmit }) {
    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const data = {
            nome: form.get("nome"),
            cpf: form.get("cpf"),
            numero_telefone: form.get("numero_telefone"),
            senha: form.get("senha")
        };

        onSubmit(data)
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Cadastrar Cliente</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-group">
                        <label>Nome</label>
                        <input type="text" name="nome" required />
                    </div>

                    <div className="input-group">
                        <label>CPF</label>
                        <input type="text" name="cpf" maxLength="11" required />
                    </div>

                    <div className="input-group">
                        <label>Número de Telefone</label>
                        <input type="text" name="numero_telefone" required />
                    </div>

                    <div className="input-group">
                        <label>Senha</label>
                        <input type="password" name="senha" required />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn cancel" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit" className="btn confirm">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}



export function ModalSetor({ open, onClose, onSubmit }) {
    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const data = {
            nome_setor: form.get("nome_setor"),
            tipo_setor: form.get("tipo_setor")
        }

        onSubmit(data)
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Cadastrar Setor</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-group">
                        <label>Nome</label>
                        <input type="text" name="nome_setor" required />
                    </div>
                    <div className="input-group">
                        <label>Tipo de Setor</label>
                        <select name="tipo_setor" required defaultValue="">
                            <option value="" disabled>Selecione um setor</option>
                            <option value="UTI">UTI</option>
                            <option value="LEITO_NORMAL">Leito Normal</option>
                            <option value="EMERGENCIA">Emergência</option>
                            <option value="MATERNIDADE">Maternidade</option>
                            <option value="PSIQUIATRICO">Psiquiátrico</option>
                            <option value="POS_CIRURGIA">Pós-cirurgia</option>
                        </select>
                    </div>


                    <div className="modal-actions">
                        <button type="button" className="btn cancel" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit" className="btn confirm">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export function ModalUpdateSetor({ open, onClose, onSubmit, setor }) {
    if (!open) return null;

    console.log(setor)


    const [formData, setFormData] = useState(() => ({
        nome_setor: "",
        tipo_setor: ""
    }));

    // Preenche o formulário quando o modal abre ou quando o setor muda
    useEffect(() => {
        if (setor) {
            setFormData({
                nome_setor: setor.nome_setor || "",
                tipo_setor: setor.tipo_setor || "",
            });
        }
    }, [setor]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Editar Setor</h2>

                <form onSubmit={handleSubmit} className="modal-form">

                    <div className="input-group">
                        <label>Nome</label>
                        <input
                            type="text"
                            name="nome_setor"
                            value={formData.nome_setor}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Tipo de Setor</label>
                        <select
                            name="tipo_setor"
                            value={formData.tipo_setor}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Selecione um setor</option>
                            <option value="UTI">UTI</option>
                            <option value="LEITO_NORMAL">Leito Normal</option>
                            <option value="EMERGENCIA">Emergência</option>
                            <option value="MATERNIDADE">Maternidade</option>
                            <option value="PSIQUIATRICO">Psiquiátrico</option>
                            <option value="POS_CIRURGIA">Pós-cirurgia</option>
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn cancel" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit" className="btn confirm">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}




export function ModalSetores({ open, onClose, setores, onSelect, user }) {
    if (!open) return null;

    const [filteredName, setFilteredName] = useState("");
    const [setorSelected, setSetorSelected] = useState(null);


    const filteredSetores = setores.filter((u) =>
        u.nome_setor.toLowerCase().includes(filteredName.toLowerCase())
    );

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ width: "700px", margin: "0 auto" }} onClick={(e) => e.stopPropagation()}>

                <h2>Selecione um setor para: {user?.nome}</h2>

                <div className="users_list" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            value={filteredName}
                            onChange={(e) => setFilteredName(e.target.value)}
                        />
                        <button>🔍</button>
                    </div>

                    <table className="users_table">
                        <thead>
                            <tr>
                                <th>Nome Setor</th>
                                <th>Tipo Setor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSetores.map((setor) => (
                                <tr key={setor.id_setor}>
                                    <td>{setor.nome_setor}</td>
                                    <td>{setor.tipo_setor}</td>
                                    <td>
                                        <button className="btn small" onClick={() => onSelect({
                                            setor,
                                            user
                                        })}>
                                            Selecionar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="modal-actions">
                    <button className="btn cancel" onClick={onClose}>Fechar</button>
                </div>

            </div>
        </div>
    );
}


export function ModalUsers({ open, onClose, users, onSelect }) {
    if (!open) return null;
    const [filteredName, setFilteredName] = useState("");
    const [userSelectd, setUserSelect] = useState(null)

    let filteredUsers = users.filter((u) =>
        u.nome.toLowerCase().includes(filteredName.toLowerCase()))

    filteredUsers = filteredName !== "" ? filteredUsers : users


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ width: "700px", margin: "0 auto" }} onClick={(e) => e.stopPropagation()}>

                <div className="users_list" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Pesquisar..."
                            onChange={(e) => setFilteredName(e.target.value)}
                        />
                        <button>
                            🔍
                        </button>
                    </div>

                    <table className="users_table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id_usuario}>
                                    <td>{user.nome}</td>
                                    <td>{user.cpf}</td>
                                    <td>{user.numero_telefone}</td>
                                    <td>
                                        <button className="btn small" onClick={() => onSelect(user)}>Selecionar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="modal-actions">
                    <button className="btn cancel" onClick={onClose}>Fechar</button>


                </div>

            </div>
        </div>
    );
}





export function ModalLeito({ open, onClose, user, setor, onSubmit }) {
    const [formData, setFormData] = useState({
        id_setor: setor?.id_setor || "",
        id_usuario: user?.id_usuario || "",
    });

    console.log(setor)

    useEffect(() => {
        if (setor || user) {
            setFormData({
                id_setor: setor?.id_setor || "",
                id_usuario: user?.id_usuario || "",
            });
        }
    }, [setor, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const created = await axios.post("http://localhost:3500/leito", { id_setor: formData.id_setor, id_usuario: formData.id_usuario })
            toast.success(created.data.message)
        } catch (e) {
            toast.error(e.message)
        }

        onClose()
        onSubmit(formData);
    };

    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ width: "500px" }}>
                <h2>Cadastrar/Editar Leito</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-group">
                        <label>Nome do Leito</label>
                        <input
                            type="text"
                            name="nome_leito"
                            value={formData.nome_leito}
                            disabled
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Setor</label>
                        <input type="text" value={setor?.nome_setor || ""} disabled />
                    </div>

                    <div className="input-group">
                        <label>Usuário</label>
                        <input type="text" value={user?.nome || ""} disabled />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="btn cancel" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn confirm">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


export function ModalLeitos({ open, onClose, onSubmit, users, setores }) {
    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const data = {
            nome_setor: form.get("nome_setor"),
            tipo_setor: form.get("tipo_setor")
        }

        onSubmit(data)
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Cadastrar Setor</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-group">
                        <label>Nome</label>
                        <input type="text" name="nome_setor" required />
                    </div>
                    <div className="input-group">
                        <label>Tipo de Setor</label>
                        <select name="tipo_setor" required defaultValue="">
                            <option value="" disabled>Selecione um setor</option>
                            <option value="UTI">UTI</option>
                            <option value="LEITO_NORMAL">Leito Normal</option>
                            <option value="EMERGENCIA">Emergência</option>
                            <option value="MATERNIDADE">Maternidade</option>
                            <option value="PSIQUIATRICO">Psiquiátrico</option>
                            <option value="POS_CIRURGIA">Pós-cirurgia</option>
                        </select>
                    </div>


                    <div className="modal-actions">
                        <button type="button" className="btn cancel" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit" className="btn confirm">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
