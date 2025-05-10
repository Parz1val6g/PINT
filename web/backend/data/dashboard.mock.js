const dashboardData = {
  nome: "Joana Silva",

  formandos: {
    total: 1322,
    masculino: 781,
    feminino: 551
  },

  aulas: {
    total: 26,
    teoricas: 12,
    praticas: 14
  },

  conteudos: {
    total: 58,
    teoricas: 28,
    praticas: 30
  },

  taxaSucesso: 78,
  sucessoTeorico: 70,
  sucessoPratico: 86,

  avaliacaoFormacao: {
    aluno: 17,
    geral: 18
  },

  avaliacaoFormador: {
    aula: 18,
    geral: 14
  },

  trabalhos: [
    { nome: "Trabalho 1", entregue: 60, porEntregar: 40 },
    { nome: "Trabalho 2", entregue: 50, porEntregar: 50 },
    { nome: "Trabalho 3", entregue: 65, porEntregar: 35 },
    { nome: "Trabalho 4", entregue: 70, porEntregar: 30 },
    { nome: "Trabalho 5", entregue: 80, porEntregar: 20 },
    { nome: "Trabalho 6", entregue: 55, porEntregar: 45 },
    { nome: "Trabalho 7", entregue: 60, porEntregar: 40 }
  ],

  formacoes: [
    {
      nome: "HTML",
      tipo: "Sincrono",
      formandos: 78,
      status: "Concluído",
      inicio: "2/8/2022",
      fim: "29/9/2022"
    },
    {
      nome: "CSS",
      tipo: "-----------",
      formandos: "---",
      status: "Pendente",
      inicio: "7/10/2022",
      fim: "26/11/2022"
    }
  ]
};

module.exports = dashboardData;
