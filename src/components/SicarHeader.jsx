import React from 'react'
import { Leaf } from 'lucide-react'
import logoSfb from '../assets/logo_sfb.png'

const SicarHeader = () => {
  return (
    <div className="sicar-header">
      <div style={{ visibility: 'hidden' }}>
        {/* Espaço reservado para alinhar a logo à direita */}
      </div>
      <div className="sicar-logo-container" style={{ justifyContent: 'center' }}>
        <img src={logoSfb} alt="Serviço Florestal Brasileiro" style={{ maxHeight: '60px', width: 'auto' }} />
      </div>
    </div>
  )
}

export default SicarHeader
