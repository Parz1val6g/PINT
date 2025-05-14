import React from 'react';
import Forum from './forum/Forum.jsx';
import ListaFormandos from './ListaFormandos/ListaFormandos.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Sidebar from './side-bar/side-bar.jsx';
import Formacao from './Formacao/Formacao.jsx';
import Avaliar from './Avaliar/Avaliar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './side-bar/side-bar.css';

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        {/*<Forum />*/}
        {/*<ListaFormandos/>*/}
        {/*<Dashboard/>*/}
        {/*<Formacao/>*/}
        {<Avaliar/>}
      </div>
    </div>
  );
}

export default App;

