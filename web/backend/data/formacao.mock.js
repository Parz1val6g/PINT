const formacaoData = {
    formandos: [
      { nome: "Ana Silva", status: "Ativo" },
      { nome: "Carlos Pereira", status: "Inativo" },
      { nome: "Bruno Costa", status: "Ativo" }
    ],
    cursos: [
      { nome: "React", inscritos: 12 },
      { nome: "Node.js", inscritos: 9 },
      { nome: "PostgreSQL", inscritos: 6 },
      { nome: "Docker", inscritos: 5 }
    ],
    progresso: [
      { percentagem: 80 },
      { percentagem: 65 },
      { percentagem: 90 }
    ],
    aulas: {
      teoricas: 20,
      praticas: 12
    },
    sucessoTeorico: 85,
    sucessoPratico: 75,
    formacoes: [
      { nome: "React Avançado", tipo: "passada" },
      { nome: "Node.js Fundamentos", tipo: "passada" },
      { nome: "PostgreSQL Intermédio", tipo: "futura" },
      { nome: "DevOps com Docker", tipo: "futura" }
    ]
  };
  
module.exports = formacaoData; // ✅
