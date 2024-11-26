import React, { useState, useEffect } from 'react';
import Axios from "axios";
import '../style/listar_agendamento.css';

function ListarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [editingAgendamentos, setEditingAgendamentos] = useState(null);
  const [editedData, setEditedData] = useState({ data_hora: '', duracao: '' });

  // Função para tratar erros
  const handleError = (error) => {
    console.error("Erro:", error);
    alert("Houve um erro ao processar a solicitação.");
  };

  // Carregar os agendamentos ao montar o componente
  useEffect(() => {
    fetchAgendamentos();
  }, []);

  // Buscar agendamentos do backend
  const fetchAgendamentos = () => {
    Axios.get("http://localhost:3001/listarAgendamentos")
      .then((response) => {
        setAgendamentos(response.data);
      })
      .catch(handleError);
  };

  // Função para formatar a data e hora
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  // Excluir agendamento
  const handleExcluirAgendamentos = (id) => {
    Axios.delete(`http://localhost:3001/excluirAgendamentos/${id}`)
      .then(() => {
        setAgendamentos(prev => prev.filter(agendamento => agendamento.id !== id));
      })
      .catch(handleError);
  };

  // Ativar modo de edição
  const handleEditClick = (agendamento) => {
    setEditingAgendamentos(agendamento);
    setEditedData({
      data_hora: agendamento.data_hora.slice(0, 16), // Garantir formato compatível com o input
      duracao: agendamento.duracao,
    });
  };

  // Salvar edições feitas
  const handleSaveClick = () => {
    Axios.put(`http://localhost:3001/editarAgendamentos/${editingAgendamentos.id}`, editedData)
      .then(() => {
        setAgendamentos(prev =>
          prev.map((agendamento) =>
            agendamento.id === editingAgendamentos.id ? { ...agendamento, ...editedData } : agendamento
          )
        );
        setEditingAgendamentos(null);
        setEditedData({ data_hora: '', duracao: '' });
      })
      .catch(handleError);
  };

  // Cancelar a edição
  const handleCancelClick = () => {
    setEditingAgendamentos(null);
    setEditedData({ data_hora: '', duracao: '' });
  };

  return (
    <div className="mt-4">
      <h2>Lista de Agendamentos</h2>
      <ul className="list-group">
        {agendamentos.length > 0 ? (
          agendamentos.map((agendamento) => (
            <li className="list-group-item d-flex justify-content-between align-items-start" key={agendamento.id}>
  {editingAgendamentos && editingAgendamentos.id === agendamento.id ? (
    // Modo de edição
    <div className="info-edit d-flex flex-column">
      <label>
        <strong>Nome:</strong> {agendamento.cliente_nome}
      </label>
      <label>
        <strong>Procedimento:</strong> {agendamento.procedimento_nome}
      </label>
      <label>
        <strong>Data & Hora:</strong>
        <input
          type="datetime-local"
          value={editedData.data_hora}
          onChange={(e) => setEditedData({ ...editedData, data_hora: e.target.value })}
          className="form-control mt-1"
        />
      </label>
      <label>
        <strong>Duração:</strong>
        <input
          type="time"
          value={editedData.duracao}
          onChange={(e) => setEditedData({ ...editedData, duracao: e.target.value })}
          className="form-control mt-1"
        />
      </label>
      <div className="mt-2 actions">
        <button className="btn btn-success btn-sm me-2" onClick={handleSaveClick}>
          Salvar
        </button>
        <button className="btn btn-secondary btn-sm" onClick={handleCancelClick}>
          Cancelar
        </button>
      </div>
    </div>
  ) : (
    // Modo de visualização
    <div className="info-view">
      <p>
        <strong>Nome:</strong> {agendamento.cliente_nome}
      </p>
      <p>
        <strong>Procedimento:</strong> {agendamento.procedimento_nome}
      </p>
      <p>
        <strong>Data & Hora:</strong> {formatDateTime(agendamento.data_hora)}
      </p>
      <p>
        <strong>Duração:</strong> {agendamento.duracao}
      </p>
    </div>
  )}
  
  <div className="button-group">
    <button
      className="btn btn-primary btn-sm mb-2"
      onClick={() => handleEditClick(agendamento)}
    >
      Editar
    </button>
    <button
      className="btn btn-danger btn-sm"
      onClick={() => handleExcluirAgendamentos(agendamento.id)}
    >
      Excluir
    </button>
  </div>
</li>


          ))
        ) : (
          <li className="list-group-item text-center">Nenhum agendamento encontrado.</li>
        )}
      </ul>
    </div>
  );
}

export default ListarAgendamentos;
