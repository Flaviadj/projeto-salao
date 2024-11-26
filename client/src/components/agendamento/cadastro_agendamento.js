import React, { useState, useEffect } from "react";
import Axios from "axios";
import ListarAgendamentos from './listar_agendamentos';
import '../style/cadastro_agendamento.css';

function CadastroAgendamentos() {
  // Estado inicial para armazenar os valores do formulário
  const [formData, setFormData] = useState({
    cliente_id: "", // Armazena o ID do cliente selecionado
    procedimento_id: "", // Armazena o ID do procedimento selecionado
    data_hora: "", // Armazena a data e hora do agendamento
    duracao: "", // Armazena a duração do procedimento
  });

  // Estado para armazenar a lista de clientes e procedimentos vindos do backend
  const [clientes, setClientes] = useState([]);
  const [procedimentos, setProcedimentos] = useState([]);

  // Estado para armazenar mensagens de feedback para o usuário
  const [mensagem, setMensagem] = useState("");

  // Busca os clientes do backend assim que o componente é montado
  useEffect(() => {
    Axios.get("http://localhost:3001/listar")
      .then((response) => setClientes(response.data)) // Atualiza a lista de clientes
      .catch((error) => console.error("Erro ao carregar clientes:", error)); // Exibe erro no console se a requisição falhar
  }, []);

  // Busca os procedimentos do backend assim que o componente é montado
  useEffect(() => {
    Axios.get("http://localhost:3001/listarProcedimentos")
      .then((response) => setProcedimentos(response.data)) // Atualiza a lista de procedimentos
      .catch((error) =>
        console.error("Erro ao carregar procedimentos:", error)
      ); // Exibe erro no console se a requisição falhar
  }, []);

  // Atualiza o estado do formulário quando o usuário altera os campos
  const handleChange = (e) => {
    const { name, value } = e.target; // Extrai o nome e o valor do campo alterado
    setFormData((prev) => ({ ...prev, [name]: value })); // Atualiza apenas o campo específico no estado
  };

  // Envia os dados do formulário para o backend ao submeter
  const handleSubmit = (e) => {
    //e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Verifica se todos os campos obrigatórios foram preenchidos
    const { cliente_id, procedimento_id, data_hora, duracao } = formData;
    if (!cliente_id || !procedimento_id || !data_hora || !duracao) {
      setMensagem("Todos os campos são obrigatórios."); // Define mensagem de erro
      return;
    }

    // Faz a requisição POST para cadastrar o agendamento
    Axios.post("http://localhost:3001/registerAgendamentos", formData)
      .then(() => {
        setMensagem("Agendamento realizado com sucesso!"); // Define mensagem de sucesso
        // Limpa os campos do formulário
        setFormData({ cliente_id: "", procedimento_id: "", data_hora: "", duracao: "" });

        // Limpa a mensagem após 3 segundos
        setTimeout(() => setMensagem(""), 3000); // Limpa a mensagem após 3 segundos
      })
      .catch((error) => {
        console.error("Erro ao criar agendamento:", error); // Exibe erro no console
        setMensagem("Erro ao realizar o agendamento."); // Define mensagem de erro
      });
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Agendamentos</h2>

      {/* Exibe a mensagem de feedback, se existir */}
      {mensagem && <div className="alert alert-info">{mensagem}</div>}

      <form onSubmit={handleSubmit}>
        {/* Dropdown para selecionar cliente */}
        <div className="form-group">
          <label>Cliente</label>
          <select
            className="form-control"
            name="cliente_id"
            value={formData.cliente_id}
            onChange={handleChange}
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown para selecionar procedimento */}
        <div className="form-group">
          <label>Procedimento</label>
          <select
            className="form-control"
            name="procedimento_id"
            value={formData.procedimento_id}
            onChange={handleChange}
          >
            <option value="">Selecione um procedimento</option>
            {procedimentos.map((procedimento) => (
              <option key={procedimento.id} value={procedimento.id}>
                {procedimento.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Campo para selecionar data e hora */}
        <div className="form-group">
          <label>Data e Hora</label>
          <input
            type="datetime-local"
            className="form-control"
            name="data_hora"
            value={formData.data_hora}
            onChange={handleChange}
          />
        </div>

        {/* Campo para inserir a duração do procedimento */}
        <div className="form-group">
          <label>Duração</label>
          <input
            type="time"
            className="form-control"
            name="duracao"
            value={formData.duracao}
            onChange={handleChange}
          />
        </div>

        {/* Botão para enviar o formulário */}
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>

      {/* Aqui está o erro anterior, corrigindo o fechamento da div */}
      <ListarAgendamentos />
    </div>
  );
}

export default CadastroAgendamentos;
