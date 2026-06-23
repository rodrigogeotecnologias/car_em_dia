import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, MonitorPlay, MessageCircle, FileText, Code, UploadCloud } from 'lucide-react'

const Home = () => {
  return (
    <div className="animate-fade-in">
      <section className="text-center" style={{ padding: '4rem 0' }}>
        <div style={{ display: 'inline-block', backgroundColor: 'var(--primary-bg)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🌱 Solução desenvolvida para o haCARthon (Desafio 1)
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>CAR Fácil</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2rem' }}>
          Uma plataforma inteligente e de <strong>código aberto</strong> para simplificar a declaração e retificação do Cadastro Ambiental Rural para os produtores.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/cadastro" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            <UploadCloud size={20} />
            Novo Cadastro (Passo a Passo)
          </Link>
          <Link to="/consulta" className="btn btn-outline" style={{ fontSize: '1.125rem', padding: '1rem 2rem', backgroundColor: 'white' }}>
            Consultar Situação (Pré-validação)
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', marginBottom: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Feito para facilitar a sua vida no campo</h2>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius)' }}>
            <h3 style={{ color: 'var(--secondary)' }}>Passo a Passo Simples</h3>
            <p style={{ color: 'var(--text-muted)' }}>Um assistente guiado orienta você sobre quais documentos reunir, como enviar seus mapas e o que preencher em cada etapa. Tudo sem complicação e com dicas automáticas.</p>
          </div>
          <div style={{ flex: '1 1 300px', padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius)' }}>
            <h3 style={{ color: 'var(--primary-light)' }}>Menos Retrabalho</h3>
            <p style={{ color: 'var(--text-muted)' }}>Evite que seu cadastro vá e volte milhares de vezes. Nosso sistema valida os dados básicos antes do envio, garantindo que chegue mais certo nas mãos do analista.</p>
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="card text-center">
          <MonitorPlay size={48} style={{ color: 'var(--primary-light)', margin: '0 auto 1rem' }} />
          <h3>Tutoriais Práticos</h3>
          <p style={{ color: 'var(--text-muted)' }}>Aprenda de forma fácil como gerar seus arquivos e resolver problemas comuns.</p>
        </div>
        <div className="card text-center">
          <ShieldCheck size={48} style={{ color: 'var(--primary-light)', margin: '0 auto 1rem' }} />
          <h3>Pré-validação</h3>
          <p style={{ color: 'var(--text-muted)' }}>Descubra possíveis inconsistências com indicadores visuais de semáforo antes de enviar.</p>
        </div>
        <div className="card text-center">
          <Code size={48} style={{ color: 'var(--primary-light)', margin: '0 auto 1rem' }} />
          <h3>Código Aberto</h3>
          <p style={{ color: 'var(--text-muted)' }}>Arquitetura modular, transparente e escalável (Bem Público Digital).</p>
        </div>
        <div className="card text-center">
          <MessageCircle size={48} style={{ color: 'var(--primary-light)', margin: '0 auto 1rem' }} />
          <h3>Comunicação Integrada</h3>
          <p style={{ color: 'var(--text-muted)' }}>Notificações automatizadas e claras para acompanhar o status do seu imóvel.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
