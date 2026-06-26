import React from 'react'
import logoCar from '../assets/logo_car.png'

const SicarHeader = () => {
  return (
    <div className="sicar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '0 20px' }}>
      
      <div style={{ width: '120px' }}>
        {/* Espaço reservado para alinhar a logo à direita e manter flex equilibrado */}
      </div>

      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', lineHeight: 1 }}>
          <span style={{ fontSize: '32px', fontWeight: '400', color: '#111' }}>ha</span>
          <span style={{ fontSize: '32px', fontWeight: '600', color: '#128242' }}>CAR</span>
          <span style={{ fontSize: '32px', fontWeight: '400', color: '#111' }}>thon</span>
        </div>
        <span style={{ fontSize: '8.5px', color: '#777', letterSpacing: '0.5px', marginTop: '3px', fontWeight: '600' }}>SOLUÇÕES PARA O CADASTRO AMBIENTAL RURAL</span>
      </div>

      <div className="sicar-logo-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: '55px' }}>
        <img src={logoCar} alt="CAR" style={{ height: '55px', width: 'auto', mixBlendMode: 'multiply' }} />
      </div>
    </div>
  )
}

export default SicarHeader
