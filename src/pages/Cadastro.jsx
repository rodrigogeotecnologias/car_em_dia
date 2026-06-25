import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, CheckCircle, ArrowRight, ArrowLeft, Info, HelpCircle } from 'lucide-react';

const Cadastro = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFileDrop = (e) => {
    e.preventDefault();
    if(e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if(e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard'); // Simula carregar o Dashboard com o resultado validado
    }, 2000);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Progresso */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', backgroundColor: 'var(--border)', zIndex: -1, transform: 'translateY(-50%)' }}>
          <div style={{ width: `${(step - 1) * 50}%`, height: '100%', backgroundColor: 'var(--success)', transition: 'width 0.3s' }}></div>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step >= i ? 'var(--success)' : 'var(--bg-color)', color: step >= i ? 'white' : 'var(--text-muted)', border: `2px solid ${step >= i ? 'var(--success)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            {step > i ? <CheckCircle size={20} /> : i}
          </div>
        ))}
      </div>

      <div className="card">
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Passo 1: Identificação do Imóvel
            </h2>
            <div style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)', padding: '1rem', borderRadius: 'var(--radius)', display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <HelpCircle color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--primary)' }}>Assistente:</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>Olá! Nesta primeira etapa, precisamos apenas dos dados básicos de localização. Não se preocupe, você pode salvar e continuar depois.</p>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Nome da Propriedade</label>
              <input type="text" className="form-control" placeholder="Ex: Fazenda haCARthon" />
            </div>
            <div className="form-group">
              <label className="form-label">Município e Estado</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" className="form-control" placeholder="Ex: Brazlândia" style={{ flex: 2 }} />
                <select className="form-control" style={{ flex: 1 }}>
                  <option>Estado...</option>
                  <option>DF</option>
                  <option>GO</option>
                  <option>MG</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={nextStep}>Avançar <ArrowRight size={18} /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Passo 2: Envio do Mapa (Camadas)
            </h2>
            <div style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)', padding: '1rem', borderRadius: 'var(--radius)', display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <Info color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--primary)' }}>Assistente:</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                  Aqui você deve enviar o desenho do seu terreno. Aceitamos arquivos <strong>.KML</strong>, <strong>.KMZ</strong> ou <strong>.ZIP</strong> (Shapefile). 
                  Se não souber como conseguir esse arquivo, clique em <em>Tutoriais</em> no menu superior.
                </p>
              </div>
            </div>

            <div 
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              style={{ border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)', padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-color)', cursor: 'pointer', transition: 'border 0.2s' }}
              onClick={() => document.getElementById('fileUpload').click()}
            >
              <UploadCloud size={48} style={{ color: 'var(--primary-light)', margin: '0 auto 1rem' }} />
              {file ? (
                <div>
                  <h4 style={{ color: 'var(--success)' }}>Arquivo anexado com sucesso!</h4>
                  <p>{file.name}</p>
                </div>
              ) : (
                <div>
                  <h4>Arraste seu arquivo de mapa aqui</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Ou clique para selecionar no computador (Max 10MB)</p>
                </div>
              )}
              <input type="file" id="fileUpload" style={{ display: 'none' }} accept=".kml,.kmz,.zip,.shp" onChange={handleFileChange} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button className="btn btn-outline" onClick={prevStep}><ArrowLeft size={18} /> Voltar</button>
              <button className="btn btn-primary" onClick={nextStep} disabled={!file}>Avançar <ArrowRight size={18} /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Passo 3: Revisão e Pré-Validação
            </h2>
            <div style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)', padding: '1rem', borderRadius: 'var(--radius)', display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <CheckCircle color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--primary)' }}>Assistente:</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>Quase lá! Ao clicar em "Validar e Concluir", nosso sistema vai cruzar os limites que você enviou com as bases de dados públicas para checar se há alguma pendência antes do envio oficial.</p>
              </div>
            </div>

            <div style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Resumo</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}><strong>Propriedade:</strong> Fazenda haCARthon</li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}><strong>Local:</strong> Brazlândia - DF</li>
                <li style={{ padding: '0.5rem 0' }}><strong>Arquivo de Mapa:</strong> {file?.name || 'mapa.kml'}</li>
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button className="btn btn-outline" onClick={prevStep}><ArrowLeft size={18} /> Voltar</button>
              <button className="btn btn-primary" onClick={handleFinish} disabled={loading}>
                {loading ? 'Validando dados...' : 'Validar e Concluir'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cadastro;
