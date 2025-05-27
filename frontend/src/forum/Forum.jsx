import React, { useState, useEffect } from 'react';
require('dotenv').config();
import axios from 'axios';
import './DropdownMenu.css';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get('http://localhost:5000/forum/posts/list');
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
    backgroundColor: '#f8f9fa',
    color: textColor,
    border: '1px solid #ced4da',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.375rem',
    width: '100%'
  };

  const dropdownData = {
    Desenvolvedor: {
      'Desenvolvedor Web': ['JavaScript', 'React JS', 'Angular'],
      'Desenvolvedor de Jogos': ['Unity', 'Unreal']
    },
    Negócios: {
      'Finanças': ['Contabilidade', 'Investimentos'],
      'Gestão': ['Liderança', 'Estratégia']
    },
    Tecnologia: {
      'Linguagens de Programação': ['C++', 'Python', 'Java']
    }
  };

  const renderDropdown = () => (
    <div
      className="btn btn-outline-secondary rounded position-relative"
      style={{ color: textColor }}
      onMouseLeave={() => {
        setSelectedArea(null);
        setSelectedCategory(null);
      }}
    >
      <div onClick={() => setDropdownOpen(!dropdownOpen)}>
        {selectedTopic || 'Selecionar Tópico'}
      </div>
      {dropdownOpen && (
        <div className="position-absolute bg-white border shadow-sm rounded d-flex p-3" style={{ top: '100%', left: 0, zIndex: 10, minWidth: '600px' }}>
          {/* Área */}
          <div className="me-3 pe-3 border-end">
            <div className="fw-bold text-primary text-center">Área</div>
            <ul className="list-unstyled text-start mt-2">
              {Object.keys(dropdownData).map(area => (
                <li
                  key={area}
                  className="dropdown-item"
                  style={{ cursor: 'pointer', color: textColor }}
                  onMouseEnter={() => {
                    setSelectedArea(area);
                    setSelectedCategory(null);
                  }}
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Categoria */}
          {selectedArea && (
            <div className="me-3 pe-3 border-end">
              <div className="fw-bold text-primary text-center">Categoria</div>
              <ul className="list-unstyled text-start mt-2">
                {Object.keys(dropdownData[selectedArea]).map(cat => (
                  <li
                    key={cat}
                    className="dropdown-item"
                    style={{ cursor: 'pointer', color: textColor }}
                    onMouseEnter={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tópico */}
          {selectedArea && selectedCategory && (
            <div>
              <div className="fw-bold text-primary text-center">Tópico</div>
              <ul className="list-unstyled text-start mt-2">
                {dropdownData[selectedArea][selectedCategory].map(topic => (
                  <li
                    key={topic}
                    className="dropdown-item"
                    style={{ cursor: 'pointer', color: textColor }}
                    onClick={() => {
                      setSelectedTopic(topic);
                      setDropdownOpen(false);
                    }}
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="px-3 py-1 rounded" style={{ color: sidebarColor }}>Fórum</h1>
        <input
          type="text"
          placeholder="Pesquisar..."
          className="form-control me-3"
          style={{ maxWidth: '250px', backgroundColor: '#f1f1f1' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary">Solicitar Novo Tópico</button>
      </div>

      <div className="mb-4 d-flex align-items-start">
        <div className="me-3" style={{ minWidth: '300px' }}>{renderDropdown()}</div>
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
                <i className="bi bi-hand-thumbs-up"></i> Gosto
              </button>
              <button className="btn btn-outline-danger btn-sm me-2">
                <i className="bi bi-hand-thumbs-down"></i> Não Gosto
              </button>
              <button className="btn btn-outline-warning btn-sm">
                <i className="bi bi-flag"></i> Reportar
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
