import { useEffect, useState } from 'react';
import axios from 'axios';
import './app.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/forum/posts`)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Erro ao buscar posts:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Fórum</h1>
      {posts.map(post => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.autor} ({post.perfil})</h5>
            <p className="card-text">{post.conteudo}</p>
            <button className="btn btn-outline-success me-2">👍 {post.likes}</button>
            <button className="btn btn-outline-danger">⚠️ {post.reports}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
