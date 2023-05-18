import React from 'react'
import '../styles/PanelAnchor.css'
interface Props {
    children: React.ReactNode
    position: | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

const PanelAnchor = ({children, position}: Props) => {
  return (
    <span className={position}>
        {children}
    </span>
  )
}

export default PanelAnchor