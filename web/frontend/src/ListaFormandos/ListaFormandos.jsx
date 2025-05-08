import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Pagination } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const FormandoCard = ({ formando, onVer, onEditar, onApagar }) => (
  <div className="d-flex align-items-center justify-content-between p-3 border rounded mb-2 bg-white text-dark shadow-sm">
    <div className="d-flex align-items-center gap-3">
      <img src={formando.perfil} alt="Perfil" width="50" height="50" className="rounded-circle" />
      <div>
        <div className="fw-bold">{formando.nome}</div>
        <small>Avaliação: {formando.avaliacao}</small>
      </div>
    </div>
    <div className="d-flex gap-2">
      <Button variant="primary" size="sm" onClick={() => onVer(formando)}>
        <FaEye className="me-1" /> Ver
      </Button>
      <Button variant="warning" size="sm" onClick={() => onEditar(formando)}>
        <FaEdit className="me-1" /> Editar
      </Button>
      <Button variant="danger" size="sm" onClick={() => onApagar(formando.id)}>
        <FaTrash className="me-1" /> Apagar
      </Button>
    </div>
  </div>
);

const ListaFormandos = () => {
  const [formandos, setFormandos] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const porPagina = 5;
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/formandos")
      .then(res => setFormandos(res.data))
      .catch(err => console.error("Erro ao buscar formandos:", err));
  }, []);

  const filtrados = formandos.filter(f =>
    f.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const totalPaginas = Math.ceil(filtrados.length / porPagina);
  const start = (paginaAtual - 1) * porPagina;
  const currentPageItems = filtrados.slice(start, start + porPagina);

  const handleVer = formando => alert(`Ver: ${formando.nome}`);
  const handleEditar = formando => alert(`Editar: ${formando.nome}`);
  const handleApagar = id => alert(`Apagar formando com ID: ${id}`);

  return (
    <div className="container-fluid bg-white text-dark min-vh-100 p-4">
      <div className="row mb-4 align-items-center">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <h2 className="mb-3 mb-md-0">Lista de Formandos</h2>
            <Form style={{ maxWidth: "250px", width: "100%" }} className="mx-auto">
              <Form.Control
                type="text"
                placeholder="Pesquisar..."
                className="bg-white text-center"
                value={pesquisa}
                onChange={e => setPesquisa(e.target.value)}
              />
            </Form>
          </div>
      </div>


      <h5 className="mb-4 text-muted">Aplicações para Internet 1</h5>

      {currentPageItems.map(formando => (
        <FormandoCard
          key={formando.id}
          formando={formando}
          onVer={handleVer}
          onEditar={handleEditar}
          onApagar={handleApagar}
        />
      ))}

      {currentPageItems.length === 0 && (
        <div className="text-center mt-4">Nenhum formando encontrado.</div>
      )}

<div className="d-flex justify-content-end mt-4">
  <Pagination className="m-0">
    <Pagination.Prev
      onClick={() => setPaginaAtual(p => Math.max(1, p - 1))}
      disabled={paginaAtual === 1}
    >
      ← Anterior
    </Pagination.Prev>

    {[...Array(totalPaginas)].map((_, i) => (
      <Pagination.Item
        key={i}
        active={paginaAtual === i + 1}
        onClick={() => setPaginaAtual(i + 1)}
        style={{
          fontWeight: paginaAtual === i + 1 ? 'bold' : 'normal',
          backgroundColor: paginaAtual === i + 1 ? '#0d6efd' : 'transparent',
          color: paginaAtual === i + 1 ? 'white' : '#343a40'
        }}
      >
        {i + 1}
      </Pagination.Item>
    ))}

    <Pagination.Next
      onClick={() => setPaginaAtual(p => Math.min(totalPaginas, p + 1))}
      disabled={paginaAtual === totalPaginas}
    >
      Próximo →
    </Pagination.Next>
  </Pagination>
</div>



    </div>
  );
};

export default ListaFormandos;
