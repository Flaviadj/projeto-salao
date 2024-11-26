import React, { useState, useEffect } from 'react';
import Axios from "axios";
import '../style/listar_cliente.css';

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);
  const [editedData, setEditedData] = useState({ nome: '', telefone: '' });

  // Obter a lista de clientes
  const fetchClientes = () => {
    Axios.get("http://localhost:3001/listar")
      .then((response) => setClientes(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleExcluirCliente = (clienteId) => {
    Axios.delete(`http://localhost:3001/excluir/${clienteId}`)
      .then(() => fetchClientes())
      .catch((error) => console.error(error));
  };

  const handleEditClick = (cliente) => {
    setEditingCliente(cliente);
    setEditedData({ nome: cliente.nome, telefone: cliente.telefone });
  };

  const handleSaveClick = () => {
    if (!editedData.nome || !editedData.telefone) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    Axios.put(`http://localhost:3001/editar/${editingCliente.id}`, editedData)
      .then(() => {
        fetchClientes();
        setEditingCliente(null);
        setEditedData({ nome: '', telefone: '' });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="mt-4">
      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p className="text-center">Nenhum cliente encontrado.</p>
      ) : (
        <ul className="list-group">
          {clientes.map((cliente) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={cliente.id}>
              <div>
                <strong>Nome:</strong> {cliente.nome}
                <br />
                <strong>Telefone:</strong> {cliente.telefone}
              </div>
              {editingCliente && editingCliente.id === cliente.id ? (
  <div>
    <input
      type="text"
      value={editedData.nome}
      onChange={(e) => setEditedData({ ...editedData, nome: e.target.value })}
    />
    <input
      type="text"
      value={editedData.telefone}
      onChange={(e) => setEditedData({ ...editedData, telefone: e.target.value })}
    />
    <button className="btn btn-success btn-sm me-2" onClick={handleSaveClick}>
      Salvar
    </button>
    <button className="btn btn-secondary btn-sm" onClick={() => setEditingCliente(null)}>
      Cancelar
    </button>
  </div>
) : (
  <div className="button-group">
    <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(cliente)}>
      Editar
    </button>
    <button className="btn btn-danger btn-sm" onClick={() => handleExcluirCliente(cliente.id)}>
      Excluir
    </button>
  </div>
)}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaClientes;
