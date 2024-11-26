import React, { useState } from 'react';
import Axios from "axios";
import InputMask from 'react-input-mask';
import ListaClientes from './listar_cliente';
import '../style/cadastro_cliente.css';

function CadastroCliente() {
  const [values, setValues] = useState({ nome: '', telefone: '' });

  // Função para manipular a mudança nos campos de entrada e atualizar o estado 'values'.
  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = (e) => {
    //e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      nome: values.nome,
      telefone: values.telefone
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Clientes</h2>
      
      <form onSubmit={handleClickButton}>
        {/* Nome do cliente */}
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name='nome'
            onChange={handleChangeValues}
          />
        </div>

        {/* Telefone do cliente */}
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <InputMask
            mask="(99) 99999-9999"
            className="form-control"
            id="telefone"
            name="telefone"
            onChange={handleChangeValues}
          />
        </div>

        {/* Botão de envio */}
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>

      {/* Exibindo a lista de clientes cadastrados */}
      <ListaClientes />
    </div>
  );
}

export default CadastroCliente;
