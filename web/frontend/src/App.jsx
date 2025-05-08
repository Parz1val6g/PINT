import React from 'react';
import Forum from './Forum.jsx';
import Sidebar from './side-bar/side-bar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './side-bar/side-bar.css';

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 bg-light">
        <Forum />
      </div>
    </div>
  );
}

export default App;
