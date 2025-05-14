import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Container,
  Form,
  Button,
  ListGroup,
  Modal,
  FloatingLabel
} from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import "../Formacao/Formacao.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Formacao = () => {
  const [data, setData] = useState({ formandos: [], cursos: [], progresso: [], aulas: {}, formacoes: [] });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [novaAula, setNovaAula] = useState({ titulo: "", descricao: "", link: "", horaInicio: "", horaFim: "", dataInicio: "", dataFim: "" });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/formacao`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Erro ao buscar dados da formação:", err);
        setData({ formandos: [], cursos: [], progresso: [], aulas: {}, formacoes: [] });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNovaAula(prev => ({ ...prev, [name]: value }));
  };

  const salvarAula = () => {
    console.log("Aula adicionada:", novaAula);
    setShowModal(false);
    setNovaAula({ titulo: "", descricao: "", link: "", horaInicio: "", horaFim: "", dataInicio: "", dataFim: "" });
  };

  if (loading) return <div className="text-primary">Carregando...</div>;

  const totalFormandos = data.formandos.length;
  const totalCursos = data.cursos.length;
  const ativos = data.formandos.filter(f => f.status === "Ativo").length;
  const mediaProgresso = data.progresso.length > 0
    ? Math.round(data.progresso.reduce((acc, cur) => acc + cur.percentagem, 0) / data.progresso.length)
    : 0;

  const barChartData = {
    labels: data.cursos.map(c => c.nome),
    datasets: [
      {
        label: "Inscritos",
        data: data.cursos.map(c => c.inscritos),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Entregues", "Por Entregar"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#0d6efd", "#084298"],
        borderWidth: 1,
      },
    ],
  };

  const formacoesPassadas = data.formacoes.filter(f => f.tipo === "passada");
  const formacoesFuturas = data.formacoes.filter(f => f.tipo === "futura");

  return (
    <Container className="mt-4 formacao-container">
      <div className="d-flex align-items-center justify-content-between mb-4 w-100">
        <h2 className="formacao-title m-0 text-sidebar">Formações</h2>
        <div className="flex-grow-1 d-flex justify-content-center">
          <Form style={{ maxWidth: "300px", width: "100%" }}>
            <Form.Control type="text" placeholder="Pesquisar..." className="bg-white text-start" />
          </Form>
        </div>
        <div style={{ width: 300 }} />
      </div>

      <Row className="mb-4 g-3">
        {[{
          title: "Total Formandos",
          value: totalFormandos
        }, {
          title: "Formandos Ativos",
          value: ativos
        }, {
          title: "Total Cursos",
          value: totalCursos
        }, {
          title: "Média Progresso",
          value: `${mediaProgresso}%`
        }].map((card, i) => (
          <Col md={3} key={i}>
            <Card className="text-center h-100 bg-white">
              <Card.Body className="text-sidebar">
                <Card.Title className="formacao-card-title">{card.title}</Card.Title>
                <Card.Text className="formacao-card-text">{card.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col md={6} className="d-flex flex-column align-items-center">
          <h5 className="formacao-chart-title text-sidebar">Distribuição de Trabalhos</h5>
          <div className="chart-wrapper">
            <Doughnut data={doughnutChartData} />
          </div>
        </Col>
        <Col md={6}>
          <h5 className="formacao-chart-title text-sidebar">Inscritos por Curso</h5>
          <Bar data={barChartData} options={{ responsive: true }} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="formacao-list-title text-sidebar">Minhas Formações</h5>
            <Button onClick={() => setShowModal(true)} variant="success">Adicionar Aula</Button>
          </div>
          <ListGroup className="formacao-list">
            {data.formacoes.map((f, i) => (
              <ListGroup.Item key={i} className="formacao-list-item d-flex justify-content-between align-items-center">
                <span>{f.nome}</span>
                <Button variant="primary">Ver Formação</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <h5 className="formacao-list-title text-sidebar">Formações Já Dadas</h5>
          <ListGroup className="formacao-list">
            {formacoesPassadas.map((f, i) => (
              <ListGroup.Item key={i} className="formacao-list-item d-flex justify-content-between align-items-center">
                <span>{f.nome}</span>
                <Button variant="secondary">Ver</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          <h5 className="formacao-list-title text-sidebar">Formações Futuras</h5>
          <ListGroup className="formacao-list">
            {formacoesFuturas.map((f, i) => (
              <ListGroup.Item key={i} className="formacao-list-item d-flex justify-content-between align-items-center">
                <span>{f.nome}</span>
                <Button variant="success">Ver</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nova Aula</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Título da Aula" className="mb-2">
            <Form.Control name="titulo" value={novaAula.titulo} onChange={handleInput} />
          </FloatingLabel>
          <FloatingLabel label="Descrição" className="mb-2">
            <Form.Control name="descricao" value={novaAula.descricao} onChange={handleInput} as="textarea" style={{ height: 80 }} />
          </FloatingLabel>
          <FloatingLabel label="Link da Aula" className="mb-2">
            <Form.Control name="link" value={novaAula.link} onChange={handleInput} type="url" />
          </FloatingLabel>
          <Row>
            <Col>
              <FloatingLabel label="Hora Início" className="mb-2">
                <Form.Control name="horaInicio" type="time" value={novaAula.horaInicio} onChange={handleInput} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Hora Fim" className="mb-2">
                <Form.Control name="horaFim" type="time" value={novaAula.horaFim} onChange={handleInput} />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <FloatingLabel label="Data Início" className="mb-2">
                <Form.Control name="dataInicio" type="date" value={novaAula.dataInicio} onChange={handleInput} />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel label="Data Fim" className="mb-2">
                <Form.Control name="dataFim" type="date" value={novaAula.dataFim} onChange={handleInput} />
              </FloatingLabel>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={salvarAula}>Salvar Aula</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Formacao;