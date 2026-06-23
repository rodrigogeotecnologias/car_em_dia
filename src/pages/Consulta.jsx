import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileSearch } from 'lucide-react'

const Consulta = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to fetch CAR data
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card">
        <div className="text-center mb-8">
          <FileSearch size={48} style={{ color: 'var(--primary-light)', margin: '0 auto 1rem' }} />
          <h2>Consulta de Situação do Imóvel</h2>
          <p style={{ color: 'var(--text-muted)' }}>Informe os dados do seu imóvel já cadastrado para iniciar a pré-validação inteligente.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Estado</label>
            <select className="form-control" required defaultValue="DF">
              <option value="">Selecione...</option>
              <option value="DF">Distrito Federal</option>
              <option value="GO">Goiás</option>
              <option value="SP">São Paulo</option>
              <option value="MG">Minas Gerais</option>
              <option value="MT">Mato Grosso</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Município</label>
            <input type="text" className="form-control" placeholder="Ex: Brazlândia" required defaultValue="Brazlândia" />
          </div>

          <div className="form-group">
            <label className="form-label">Nome da Propriedade</label>
            <input type="text" className="form-control" placeholder="Ex: Fazenda Ipê Amarelo" required defaultValue="Fazenda Ipê Amarelo" />
          </div>

          <div className="form-group">
            <label className="form-label">Número do CAR (obrigatório)</label>
            <input type="text" className="form-control" required placeholder="Ex: DF-5300108-..." defaultValue="DF-5300108-1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P" />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? 'Buscando Imóvel...' : 'Consultar Situação'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Consulta
