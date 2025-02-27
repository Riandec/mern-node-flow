import React from 'react'

function Navbar() {
  return (
    <div className="Navbar">
        <div className="Navbar__menu">
            <ul>
              <li><img src="images/menu-1.png" alt="menu-icon" /></li>
              <li><img src="images/menu-2.png" alt="menu-icon" /></li>
              <li><img src="images/menu-3.png" alt="menu-icon" /></li>
            </ul>
        </div>
        <div className="Navbar__title">Nodes-Edges Flow</div>
    </div>
  )
}

export default Navbar