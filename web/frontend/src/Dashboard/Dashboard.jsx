<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container, Form, InputGroup, Button, ListGroup } from "react-bootstrap";
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
import "./Dashboard.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({ formandos: [], cursos: [], progresso: [], aulas: {}, formacoes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setData({ formandos: [], cursos: [], progresso: [], aulas: {}, formacoes: [] });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-primary">Carregando...</div>;

  const totalFormandos = Array.isArray(data.formandos) ? data.formandos.length : 0;
  const totalCursos = Array.isArray(data.cursos) ? data.cursos.length : 0;
  const ativos = Array.isArray(data.formandos) ? data.formandos.filter(f => f.status === "Ativo").length : 0;
  const mediaProgresso = Array.isArray(data.progresso) && data.progresso.length > 0
    ? Math.round(data.progresso.reduce((acc, cur) => acc + cur.percentagem, 0) / data.progresso.length)
    : 0;

  const barChartData = {
    labels: ["Curso 1", "Curso 2", "Curso 3", "Curso 4"],
    datasets: [
      {
        label: "Inscritos",
        data: [12, 19, 3, 5],
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
    <Container className="mt-4 dashboard-container">
      <div className="d-flex align-items-center justify-content-between mb-4 w-100">
        <h2 className="dashboard-title m-0 text-start">Dashboard</h2>
        <div className="flex-grow-1 d-flex justify-content-center">
          <Form style={{ maxWidth: "300px", width: "100%" }}>
            <Form.Control
              type="text"
              placeholder="Pesquisar..."
              className="bg-white text-start"
            />
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
        }, {
          title: "Aulas Teóricas",
          value: data.aulas?.teoricas ?? 0
        }, {
          title: "Aulas Práticas",
          value: data.aulas?.praticas ?? 0
        }, {
          title: "Sucesso Teórico",
          value: `${data.sucessoTeorico ?? 0}%`
        }, {
          title: "Sucesso Prático",
          value: `${data.sucessoPratico ?? 0}%`
        }].map((card, i) => (
          <Col md={3} key={i}>
            <Card className="text-center h-100 dashboard-card">
              <Card.Body>
                <Card.Title className="dashboard-card-title">{card.title}</Card.Title>
                <Card.Text className="dashboard-card-text">{card.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col md={6} className="d-flex flex-column align-items-center">
          <h5 className="dashboard-chart-title">Distribuição de Trabalhos</h5>
          <div className="chart-wrapper">
            <Doughnut data={doughnutChartData} />
          </div>
        </Col>
        <Col md={6}>
          <h5 className="dashboard-chart-title">Inscritos por Curso</h5>
          <Bar data={barChartData} options={{ responsive: true }} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h5 className="dashboard-list-title">Formações do Formador</h5>
          <ListGroup className="dashboard-list">
            {data.formacoes.map((f, i) => (
              <ListGroup.Item key={i} className="dashboard-list-item d-flex justify-content-between align-items-center">
                <span>{f.nome}</span>
                <Button variant="primary">Ver Formação</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <h5 className="dashboard-list-title">Formações Já Dadas</h5>
          <ListGroup className="dashboard-list">
            {formacoesPassadas.map((f, i) => (
              <ListGroup.Item key={i} className="dashboard-list-item d-flex justify-content-between align-items-center">
                <span>{f.nome}</span>
                <Button variant="secondary">Ver</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          <h5 className="dashboard-list-title">Formações Futuras</h5>
          <ListGroup className="dashboard-list">
            {formacoesFuturas.map((f, i) => (
              <ListGroup.Item key={i} className="dashboard-list-item d-flex justify-content-between align-items-center">
                <span>{f.nome}</span>
                <Button variant="success">Ver</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Container, Form, InputGroup, Button, ListGroup } from "react-bootstrap";
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
import "./Dashboard.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({ formandos: [], cursos: [], progresso: [], aulas: {}, formacoes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error(err);
        setData({ formandos: [], cursos: [], progresso: [], aulas: {}, formacoes: [] });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-primary">Carregando...</div>;

  const totalFormandos = Array.isArray(data.formandos) ? data.formandos.length : 0;
  const totalCursos = Array.isArray(data.cursos) ? data.cursos.length : 0;
  const ativos = Array.isArray(data.formandos) ? data.formandos.filter(f => f.status === "Ativo").length : 0;
  const mediaProgresso = Array.isArray(data.progresso) && data.progresso.length > 0
    ? Math.round(data.progresso.reduce((acc, cur) => acc + cur.percentagem, 0) / data.progresso.length)
    : 0;

  const barChartData = {
    labels: ["Curso 1", "Curso 2", "Curso 3", "Curso 4"],
    datasets: [
      {
        label: "Inscritos",
        data: [12, 19, 3, 5],
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

  return (
    <Container className="mt-4 dashboard-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0 dashboard-title">Dashboard</h2>
        <div className="search-bar">
          <InputGroup>
            <Form.Control type="text" placeholder="Pesquisar..." className="search-input" />
          </InputGroup>
        </div>
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
        }, {
          title: "Aulas Teóricas",
          value: data.aulas?.teoricas ?? 0
        }, {
          title: "Aulas Práticas",
          value: data.aulas?.praticas ?? 0
        }, {
          title: "Sucesso Teórico",
          value: `${data.sucessoTeorico ?? 0}%`
        }, {
          title: "Sucesso Prático",
          value: `${data.sucessoPratico ?? 0}%`
        }].map((card, i) => (
          <Col md={3} key={i}>
            <Card className="text-center h-100 dashboard-card">
              <Card.Body>
                <Card.Title className="dashboard-card-title">{card.title}</Card.Title>
                <Card.Text className="dashboard-card-text">{card.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col md={6} className="d-flex flex-column align-items-center">
          <h5 className="dashboard-chart-title">Distribuição de Trabalhos</h5>
          <div className="chart-wrapper">
            <Doughnut data={doughnutChartData} />
          </div>
        </Col>
        <Col md={6}>
          <h5 className="dashboard-chart-title">Inscritos por Curso</h5>
          <Bar data={barChartData} options={{ responsive: true }} />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h5 className="dashboard-list-title">Formações do Formador</h5>
          <ListGroup className="dashboard-list">
            {data.formacoes.map((f, i) => (
              <ListGroup.Item key={i} className="dashboard-list-item d-flex justify-content-between align-items-center">
                <span>{f.nome}</span>
                <Button variant="primary">Ver Formação</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

>>>>>>> 8d8dc97c500b285edac38ab10bb059922967984c
export default Dashboard;