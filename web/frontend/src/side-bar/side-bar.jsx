// src/side-bar/Sidebar.jsx
import React from 'react';
import './side-bar.css';

const navItems = [
  { name: 'DashBoard', svg: 'bi-house-door-fill', href: '#' },
  {
    name: 'XXXXX', svg: 'bi-mortarboard-fill', sub: [
      { name: 'X1X2X3', href: '#' },
      { name: 'X1X2X3', href: '#' },
      { name: 'X1X2X3', href: '#' },
      { name: 'X1X2X3', href: '#' },
    ],
  },
  {
    name: 'Formandos', svg: 'bi-journal-check', sub: [
      { name: 'X1X2X3', href: '#' },
      { name: 'X1X2X3', href: '#' },
      { name: 'X1X2X3', href: '#' },
      { name: 'X1X2X3', href: '#' },
    ],
  },
  { name: 'Avaliações / Tarefas', svg: 'bi-graph-up-arrow', href: '#' },
  { name: 'Perfil', svg: 'bi-calendar-week', href: '#' },
  { name: 'Fórum', svg: 'bi-person-fill', href: '#' },
  { name: 'Definições', svg: 'bi-chat-left-quote', href: '#' },
  { name: 'Ajuda / FAQ', svg: 'bi-gear-fill', href: '#' },
  { name: 'Logout', svg: 'bi-gear-fill', href: '#' },
];

export default function Sidebar() {
  return (
    <nav className="nav flex-column col-2 vh-100 bg-dark text-white p-3">
      <div className="d-flex flex-column align-items-center">
        <img src="/src/assets/logotipo.png" className="w-75 py-4" alt="Logo" />
        <div className="d-flex flex-row align-items-center w-100">
          <img src="/src/assets/profile-picture.png" className="w-25 rounded-circle" alt="Perfil" />
          <div className="d-flex flex-column w-auto ps-3">
            <p className="fs-5 fw-bold m-0">Username</p>
            <p className="fs-6 m-0">Formando</p>
          </div>
        </div>
      </div>
      <hr className="my-4 mx-0" />
      <div className="d-flex flex-column w-100">
        {navItems.map((item, i) => (
          item.sub ? (
            <div key={i}>
              <button
                className="fs-6 btn btn-secondary dropdown-toggle rounded-0 p-0 px-3 my-2 bg-transparent border-0 text-start w-100"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${i}`}
                aria-expanded="false"
                aria-controls={`collapse-${i}`}
              >
                <i className={`bi ${item.svg} me-2`} /> {item.name}
              </button>
              <div id={`collapse-${i}`} className="collapse ps-3">
                {item.sub.map((opt, j) => (
                  <a key={j} href={opt.href} className="fs-6 d-block ps-4 text-white">
                    {opt.name}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              key={i}
              className="fs-6 btn btn-secondary rounded-0 bg-transparent border-0 text-start my-2 text-white"
              href={item.href}
            >
              <i className={`bi ${item.svg} me-2`} /> {item.name}
            </a>
          )
        ))}
      </div>
    </nav>
  );
}
