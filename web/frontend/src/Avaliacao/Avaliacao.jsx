import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import './Avaliacao.css';

function AvaliacaoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formando, setFormando] = useState(null);
  const [nota, setNota] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/avaliacao/${id}`)
      .then(res => res.json())
      .then(setFormando)
      .catch(console.error);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/avaliacao/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nota, observacoes }),
    })
      .then(res => res.json())
      .then(() => {
        setSucesso(true);
        setTimeout(() => navigate('/'), 2000);
      });
  };

  if (!formando) return <p>A carregar...</p>;

  return (
    <Container className="mt-4">
      <h2>Avaliar {formando.nome}</h2>
      {sucesso && <Alert variant="success">Avaliação enviada com sucesso!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nota">
          <Form.Label>Nota</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="20"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="observacoes" className="mt-3">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submeter Avaliação
        </Button>
        <Button variant="secondary" className="mt-3 ms-3" onClick={() => navigate('/')}>Voltar</Button>
      </Form>
    </Container>
  );
}

export default AvaliacaoPage;