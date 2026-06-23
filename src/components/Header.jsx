import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <Leaf className="logo-icon" size={28} />
          <span>CAR Fácil</span>
        </Link>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/" className="btn btn-outline" style={{ border: 'none' }}>Início</Link>
          <Link to="/tutoriais" className="btn btn-outline" style={{ border: 'none' }}>Tutoriais</Link>
          <Link to="/consulta" className="btn btn-outline">Consultar Situação</Link>
          <Link to="/cadastro" className="btn btn-primary">Novo Cadastro</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
