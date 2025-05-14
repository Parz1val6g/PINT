import React, { useEffect, useState } from 'react';
import { Table, Badge, Button, Container, Pagination } from 'react-bootstrap';
import './Avaliar.css';

function Avaliar() {
  const [formandos, setFormandos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const porPagina = 8;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/avaliar`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setFormandos(data);
        else setFormandos([]);
      })
      .catch(console.error);
  }, []);

  const items = Array.isArray(formandos) ? formandos : [];
  const filteredItems = items.filter(f =>
    f.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPaginas = Math.ceil(filteredItems.length / porPagina);
  const currentItems = filteredItems.slice((paginaAtual - 1) * porPagina, paginaAtual * porPagina);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="px-3 py-1 rounded" style={{ color: '#343a40' }}>Avaliar</h2>
        <input
          type="text"
          placeholder="Pesquisar..."
          className="form-control me-3"
          style={{ maxWidth: '250px', backgroundColor: '#f1f1f1' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div style={{ width: 200 }}></div>
      </div>

      <p style={{ color: '#343a40', fontWeight: '500' }}>Aplicações Para Internet 1</p>


      <Table striped bordered hover responsive className="bg-custom-white text-custom-dark custom-rounded-table">
        <thead className="text-center">
          <tr>
            <th>Formandos</th>
            <th>Trabalhos Entregues</th>
            <th>Avaliado</th>
            <th>Data de Avaliação</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((f, i) => (
            <tr key={i} className="align-middle text-center">
              <td className="d-flex align-items-center gap-2">
                <img src={f.foto} alt="foto" className="rounded-circle" width={40} height={40} />
                {f.nome}
              </td>
              <td>{f.trabalhosEntregues}</td>
              <td>
                <Badge bg={f.avaliado ? 'success' : 'danger'}>
                  {f.avaliado ? 'Sim' : 'Não'}
                </Badge>
              </td>
              <td>{f.dataAvaliacao || '--/--/--'}</td>
              <td>
                <Button variant="primary" size="sm">Avaliar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <Pagination className="custom-pagination">
          <Pagination.Prev disabled={paginaAtual === 1} onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))}>
            ← Anterior
          </Pagination.Prev>
          {[...Array(totalPaginas)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={paginaAtual === i + 1}
              onClick={() => setPaginaAtual(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next disabled={paginaAtual === totalPaginas} onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))}>
            Próximo →
          </Pagination.Next>
        </Pagination>
      </div>
    </Container>
  );
}

export default Avaliar;
