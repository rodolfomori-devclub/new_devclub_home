import './CTABar.css'

function CTABar() {
  return (
    <div className="cta-bar">
      <div className="cta-bar__container">
        <div className="cta-bar__brand">
          <img src="/figma/Group.png" alt="" className="cta-bar__logo" />
          <span className="cta-bar__name">DevClub</span>
        </div>

        <div className="cta-bar__pricing">
          <span className="cta-bar__discount">30% OFF</span>
          <span className="cta-bar__price">De R$2197 por 1197</span>
        </div>

        <a href="#" className="cta-bar__btn">
          <span className="cta-bar__btn-icon">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Quero adquirir
        </a>
      </div>
    </div>
  )
}

export default CTABar
