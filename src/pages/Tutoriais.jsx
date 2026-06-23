import React from 'react';
import { BookOpen, Video, Map, HelpCircle } from 'lucide-react';

const Tutoriais = () => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="text-center mb-8">
        <BookOpen size={48} style={{ color: 'var(--primary-light)', margin: '0 auto 1rem' }} />
        <h2>Central de Tutoriais</h2>
        <p style={{ color: 'var(--text-muted)' }}>Aprenda a utilizar o sistema, obter seus mapas e resolver inconsistências de forma simples.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Map color="var(--primary)" />
            <h3 style={{ margin: 0 }}>Como obter meu arquivo KML/Shapefile?</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
            Aprenda passo a passo como desenhar ou extrair o mapa da sua propriedade usando ferramentas gratuitas como o Google Earth ou plataformas do governo estadual.
          </p>
          <button className="btn btn-outline w-full"><Video size={18} /> Assistir Vídeo</button>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <HelpCircle color="var(--warning)" />
            <h3 style={{ margin: 0 }}>O que o sistema corrige?</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
            Nosso sistema indica cruzamentos incorretos (ex: sua reserva legal caindo em cima de um rio) e avisa o que você deve fazer. <strong>Nós não alteramos dados do sistema oficial automaticamente.</strong>
          </p>
          <button className="btn btn-outline w-full"><BookOpen size={18} /> Ler Artigo</button>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Video color="var(--success)" />
            <h3 style={{ margin: 0 }}>Passo a passo da retificação</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
            Descobriu um erro? Veja neste guia prático de 3 minutos como acessar o portal oficial gov.br e submeter seu mapa corrigido com segurança.
          </p>
          <button className="btn btn-outline w-full"><Video size={18} /> Assistir Vídeo</button>
        </div>

      </div>
    </div>
  );
};

export default Tutoriais;
