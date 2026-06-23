import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import Consulta from './pages/Consulta'
import Dashboard from './pages/Dashboard'
import Tutoriais from './pages/Tutoriais'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container mt-4 mb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/consulta" element={<Consulta />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutoriais" element={<Tutoriais />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
