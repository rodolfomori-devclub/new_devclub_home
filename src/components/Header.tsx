import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header__container container">
        <a href="/" className="header__logo">
          <img src="/figma/Group.png" alt="" className="header__logo-icon" />
        </a>

        <a href="#pricing" className="header__cta">
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
