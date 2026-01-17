import './FooterBar.css'

function FooterBar() {
  return (
    <div className="footer-bar">
      <div className="footer-bar__container">
        <div className="footer-bar__brand">
          <img src="/figma/Group.png" alt="" className="footer-bar__logo" />
          <span className="footer-bar__logo-text">DevClub</span>
        </div>

        <div className="footer-bar__offer">
          <span className="footer-bar__discount">30% OFF</span>
          <span className="footer-bar__price">De R$2197 por 1197</span>
        </div>

        <a href="#" className="footer-bar__cta">
          <span className="footer-bar__cta-icon">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Quero adquirir
        </a>
      </div>
    </div>
  )
}

export default FooterBar
