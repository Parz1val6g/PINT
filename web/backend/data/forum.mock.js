const forumPosts = [
  {
    id: 1,
    username: 'Tiago',
    role: 'formando',
    text: 'Este é um post de exemplo.',
    fileUrl: null,
    date: new Date().toISOString()
  },
  {
    id: 2,
    username: 'Formador',
    role: 'formador',
    text: 'Bem-vindo ao fórum!',
    fileUrl: null,
    date: new Date().toISOString()
  },
  {
    id: 3,
    username: 'Gestor',
    role: 'gestor',
    text: 'Sou o gestor do sistema.',
    fileUrl: null,
    date: new Date().toISOString()
  }
];

module.exports = forumPosts;
