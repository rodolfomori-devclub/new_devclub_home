import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isHomePage = location.pathname === '/'

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          <img src="/figma/Group.png" alt="" className="header__logo-icon" />
        </Link>

        <button className="header__menu-toggle" onClick={toggleMenu} aria-label="Menu">
          <span className={`header__hamburger ${isMenuOpen ? 'header__hamburger--open' : ''}`}></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}>
          <Link to="/" className="header__nav-link" onClick={closeMenu}>Home</Link>
          {isHomePage ? (
            <a href="#about" className="header__nav-link" onClick={closeMenu}>Sobre</a>
          ) : (
            <Link to="/#about" className="header__nav-link" onClick={closeMenu}>Sobre</Link>
          )}
          {isHomePage ? (
            <a href="#courses" className="header__nav-link" onClick={closeMenu}>Formações</a>
          ) : (
            <Link to="/#courses" className="header__nav-link" onClick={closeMenu}>Formações</Link>
          )}
          <a href="https://lp.devclub.com.br/mba" className="header__nav-link" target="_blank" rel="noopener noreferrer">MBA</a>
          <Link to="/blog" className="header__nav-link" onClick={closeMenu}>Blog</Link>
          <Link to="/newsletter" className="header__nav-link" onClick={closeMenu}>Newsletter</Link>
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
