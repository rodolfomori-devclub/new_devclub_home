import { useState } from 'react'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header__container container">
        <a href="/" className="header__logo">
          <img src="/figma/Group.png" alt="" className="header__logo-icon" />
        </a>

        <button className="header__menu-toggle" onClick={toggleMenu} aria-label="Menu">
          <span className={`header__hamburger ${isMenuOpen ? 'header__hamburger--open' : ''}`}></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <a href="/" className="header__nav-link">Home</a>
          <a href="#about" className="header__nav-link">Sobre</a>
          <a href="#courses" className="header__nav-link">Formações</a>
          <a href="https://lp.devclub.com.br/mba" className="header__nav-link" target="_blank" rel="noopener noreferrer">MBA</a>
          <a href="/blog" className="header__nav-link">Blog</a>
          <a href="/newsletter" className="header__nav-link">Newsletter</a>
          <a href="https://stars.devclub.com.br" className="header__nav-link" target="_blank" rel="noopener noreferrer">Nossos Alunos</a>
          <a href="https://aulas.devclub.com.br/" className="header__nav-link" target="_blank" rel="noopener noreferrer">Login</a>
        </nav>

        <a
          href="https://api.whatsapp.com/send/?phone=554892195974&text=quero%20me%20matricular&type=phone_number&app_absent=0"
          className="header__cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="header__cta-icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Matricule-se
        </a>
      </div>
    </header>
  )
}

export default Header
