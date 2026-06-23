import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, LayersControl } from 'react-leaflet';
import { Download, AlertTriangle, CheckCircle, Info, MessageSquare, X, Send, Leaf } from 'lucide-react';
import { mockProperty } from '../mockData/propertyData';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
  const [selectedPendency, setSelectedPendency] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { text: 'Olá! Sou seu Assistente Ambiental. Como posso ajudar com o seu CAR?', isBot: true }
  ]);
  const [basemap, setBasemap] = useState('osm'); // 'osm' ou 'satellite'
  const reportRef = useRef(null);

  // Chatbot questions
  const quickQuestions = [
    "O que é APP?",
    "O que é Reserva Legal?",
    "O que significa sobreposição?",
    "Como corrigir meu CAR?"
  ];

  const handleSendQuestion = (question) => {
    setChatMessages([...chatMessages, { text: question, isBot: false }]);
    
    // Simulate bot response
    setTimeout(() => {
      let reply = "Desculpe, não entendi.";
      if (question.includes("APP")) {
        reply = "APP significa Área de Preservação Permanente. São áreas que devem ser mantidas com vegetação nativa, como beiras de rios, nascentes e topos de morro, para proteger as águas e evitar desastres.";
      } else if (question.includes("Reserva Legal")) {
        reply = "Reserva Legal é uma porcentagem da sua propriedade que deve ser mantida com vegetação nativa. O tamanho varia dependendo da região e do bioma.";
      } else if (question.includes("sobreposição")) {
        reply = "Sobreposição acontece quando o mapa da sua propriedade está desenhado por cima do mapa de outra pessoa, de uma terra indígena ou de uma unidade de conservação. É preciso corrigir os limites para evitar conflitos.";
      } else if (question.includes("corrigir")) {
        reply = "Para corrigir, você precisa acessar o sistema oficial do CAR (SICAR) ou procurar um técnico/consultor ambiental para retificar os limites e informações enviadas.";
      }
      
      setChatMessages(prev => [...prev, { text: reply, isBot: true }]);
    }, 1000);
  };

  const generatePDF = () => {
    window.print();
  };

  const renderStatusIcon = (status) => {
    if (status === 'success') return <CheckCircle color="var(--success)" />;
    if (status === 'warning') return <AlertTriangle color="var(--warning)" />;
    if (status === 'danger') return <X color="var(--danger)" style={{ backgroundColor: '#f8d7da', borderRadius: '50%' }} />;
    return <Info color="var(--primary-light)" />;
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Bar */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>{mockProperty.nome}</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {mockProperty.municipio} - {mockProperty.estado} | CAR: {mockProperty.numeroCar}
          </p>
        </div>
        <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Índice de Regularidade</span>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>
              {mockProperty.indiceRegularidade}<span style={{ fontSize: '1rem' }}>/100</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'flex-end' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></span>
              Boa condição para análise
            </div>
          </div>
          <div className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button className="btn btn-primary" onClick={() => alert("Simulação: Redirecionando para integração com Gov.br e enviando os dados validados para a base oficial do SICAR.")}>
              <CheckCircle size={20} />
              Enviar para o SICAR (Oficial)
            </button>
            <button className="btn btn-outline" onClick={generatePDF}>
              <Download size={20} />
              Gerar Relatório PDF
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
        
        {/* Left Column: Map and Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Map Container */}
          <div className="card map-container" style={{ padding: 0, overflow: 'hidden', height: '500px' }}>
            <MapContainer center={mockProperty.center} zoom={15} style={{ height: '100%', width: '100%' }}>
              <LayersControl position="topright">
                <LayersControl.BaseLayer name="OpenStreetMap">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked name="Satélite (Simulado)">
                  <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                </LayersControl.BaseLayer>
                
                <LayersControl.Overlay checked name="[DECLARADO] Limites do Imóvel">
                  <Polygon positions={mockProperty.limites} pathOptions={{ color: 'white', fillOpacity: 0, weight: 3, dashArray: '5, 5' }} />
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="[BASE GOVERNO] Rio / Hidrografia">
                  <Polyline positions={mockProperty.hidrografia} pathOptions={{ color: '#00bfff', weight: 4 }} />
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="[BASE GOVERNO] APP Oficial (30m)">
                  <Polygon positions={mockProperty.appOficial} pathOptions={{ color: 'red', fillOpacity: 0.3, weight: 1 }} />
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="[DECLARADO] APP (Inconsistente)">
                  <Polygon positions={mockProperty.appDeclarada} pathOptions={{ color: 'yellow', fillOpacity: 0.6, weight: 2 }} />
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="[DECLARADO] Reserva Legal">
                  <Polygon positions={mockProperty.reservaLegal} pathOptions={{ color: 'green', fillOpacity: 0.5, weight: 2 }} />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="[DECLARADO] Uso Alternativo (Consolidada)">
                  <Polygon positions={mockProperty.usoAlternativo} pathOptions={{ color: 'orange', fillOpacity: 0.4, weight: 1 }} />
                </LayersControl.Overlay>
              </LayersControl>
            </MapContainer>
          </div>

          {/* Tradutor Ambiental (Details) */}
          {selectedPendency ? (
            <div className="card animate-fade-in" style={{ borderLeft: `5px solid var(--${selectedPendency.status})` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {renderStatusIcon(selectedPendency.status)}
                  {selectedPendency.tipo}
                </h3>
                <button onClick={() => setSelectedPendency(null)} className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }}>Fechar</button>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius)' }}>
                  <strong>Termo Técnico:</strong> <span style={{ color: 'var(--text-muted)' }}>{selectedPendency.tituloTecnico}</span>
                  <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      <Leaf size={18} /> Tradutor Ambiental
                    </div>
                    <p style={{ fontSize: '1.1rem' }}>"{selectedPendency.explicacaoSimples}"</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--danger)', fontSize: '1rem' }}>Possíveis Impactos</h4>
                    <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                      {selectedPendency.impactos.length > 0 ? (
                        selectedPendency.impactos.map((imp, idx) => <li key={idx}>{imp}</li>)
                      ) : (
                        <li>Nenhum impacto negativo esperado.</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--primary)', fontSize: '1rem' }}>Recomendação</h4>
                    <p style={{ color: 'var(--text-muted)' }}>{selectedPendency.recomendacao}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '3rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-color)' }}>
              <Info size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>Clique em uma pendência ao lado para ver o detalhamento e as recomendações pelo Tradutor Ambiental.</p>
            </div>
          )}
        </div>

        {/* Right Column: Validation Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3>Resultados da Pré-Validação</h3>
          
          {mockProperty.pendencias.map(pendencia => (
            <div 
              key={pendencia.id} 
              className="card" 
              style={{ 
                cursor: 'pointer', 
                borderLeft: `4px solid var(--${pendencia.status})`,
                transition: 'transform 0.2s',
                transform: selectedPendency?.id === pendencia.id ? 'scale(1.02)' : 'scale(1)'
              }}
              onClick={() => setSelectedPendency(pendencia)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                {renderStatusIcon(pendencia.status)}
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{pendencia.tipo}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {pendencia.explicacaoSimples}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Chat Button */}
      <button 
        className="btn btn-primary"
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', borderRadius: '50px', width: '60px', height: '60px', padding: 0, boxShadow: 'var(--shadow-lg)', zIndex: 1000 }}
        onClick={() => setChatOpen(!chatOpen)}
      >
        {chatOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className="card" style={{ position: 'fixed', bottom: '6rem', right: '2rem', width: '350px', height: '500px', display: 'flex', flexDirection: 'column', padding: 0, boxShadow: 'var(--shadow-lg)', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={20} />
            <h3 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>Assistente Ambiental</h3>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--bg-color)' }}>
            {chatMessages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.isBot ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
                <div style={{ backgroundColor: msg.isBot ? 'white' : 'var(--primary-light)', color: msg.isBot ? 'var(--text-dark)' : 'white', padding: '0.75rem', borderRadius: '1rem', borderBottomLeftRadius: msg.isBot ? 0 : '1rem', borderBottomRightRadius: msg.isBot ? '1rem' : 0, boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem' }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', backgroundColor: 'white', borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Dúvidas frequentes:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {quickQuestions.map((q, i) => (
                <button key={i} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '50px' }} onClick={() => handleSendQuestion(q)}>
                  {q}
                </button>
              ))}
            </div>
            {/* Input mock (not functional, just for show) */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="text" className="form-control" placeholder="Digite sua pergunta..." style={{ padding: '0.5rem' }} />
              <button className="btn btn-primary" style={{ padding: '0.5rem' }}><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
