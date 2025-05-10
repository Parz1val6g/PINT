import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:5000/api/forum');
    setPosts(response.data);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', newPostText);
    if (file) formData.append('file', file);

    await axios.post('http://localhost:5000/api/forum', formData);
    setNewPostText('');
    setFile(null);
    fetchPosts();
  };

  const roleIcon = {
    formando: 'bi-person-circle',
    formador: 'bi-mortarboard-fill',
    gestor: 'bi-person-gear'
  };

  const sidebarColor = '#343a40';
  const textColor = '#343a40';
  const bgWhite = '#ffffff';
  const inputFileStyle = {
    backgroundColor: bgWhite,
    color: textColor,
    border: '1px solid #ced4da',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.375rem',
    width: '100%',
    height: 'calc(2.25rem + 2px)'
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="px-3 py-1 rounded" style={{ color: sidebarColor }}>Fórum</h1>
        <button className="btn btn-primary">Solicitar Novo Tópico</button>
      </div>

      {posts.map((post, idx) => (
        <div key={idx} className="card mb-3 border-0 shadow-sm" style={{ backgroundColor: bgWhite }}>
          <div className="card-body" style={{ color: textColor }}>
            <h5 className="d-flex align-items-center gap-2">
              <i className={`bi ${roleIcon[post.role] || 'bi-person-fill'}`}></i>
              {post.username}
            </h5>
            <h6 className="card-subtitle mb-2" style={{ color: textColor }}>{new Date(post.date).toLocaleString()}</h6>
            <p className="card-text" style={{ color: textColor }}>{post.text}</p>
            {post.fileUrl && (
              <a href={post.fileUrl} target="_blank" rel="noreferrer" className="btn btn-link">Ver Documento</a>
            )}
            <div className="mt-2">
              <button className="btn btn-outline-success btn-sm me-2">
                <i className="bi bi-hand-thumbs-up me-1"></i>Gosto
              </button>
              <button className="btn btn-outline-danger btn-sm me-2">
                <i className="bi bi-hand-thumbs-down me-1"></i>Não Gosto
              </button>
              <button className="btn btn-outline-warning btn-sm">
                <i className="bi bi-flag me-1"></i>Reportar
              </button>
            </div>
          </div>
        </div>
      ))}

      <form onSubmit={handlePostSubmit} className="mt-4">
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Escreva sua publicação"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          required
          style={{ resize: 'none', backgroundColor: bgWhite, color: textColor, borderColor: '#ccc' }}
        />
        <input
          type="file"
          className="form-control mb-3"
          style={inputFileStyle}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="text-end">
          <button type="submit" className="btn btn-success">Publicar</button>
        </div>
      </form>
    </div>
  );
}

export default Forum;