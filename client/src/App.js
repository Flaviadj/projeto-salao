import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CadastroAgendamentos from "./components/agendamento/cadastro_agendamento";
import CadastroCliente from "./components/cliente/cadastro_cliente"; 

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <h1>Bem-vindo ao Sistema de Agendamento</h1>

        {/* Links de navegação */}
        <div>
          <Link to="/agendamentos" className="btn btn-link">
            Agendamentos
          </Link>
          <Link to="/clientes" className="btn btn-link ml-3">
            Clientes
          </Link>
        </div>

        {/* Definição das rotas */}
        <Routes>
          <Route path="/agendamentos" element={<CadastroAgendamentos />} />
          <Route path="/clientes" element={<CadastroCliente />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
