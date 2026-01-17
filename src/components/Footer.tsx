import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <img src="/figma/Group.png" alt="" className="footer__logo-icon" />
              <span className="footer__logo-text">Dev Club</span>
            </a>
            <p className="footer__tagline">
              Profissional de elite de programação
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Navegue</h4>
              <ul className="footer__menu">
                <li><a href="#about">Como funciona</a></li>
                <li><a href="#courses">DevClub</a></li>
                <li><a href="#for-who">Vantagens</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Newsletter</h4>
              <div className="footer__newsletter">
                <div className="footer__newsletter-form">
                  <input type="email" placeholder="Seu email" className="footer__newsletter-input" />
                  <button className="footer__newsletter-btn">Enviar</button>
                </div>
                <p className="footer__newsletter-disclaimer">
                  Ao se cadastrar você concorda com nossa Política de Privacidade.
                </p>
              </div>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Acompanhe</h4>
              <p className="footer__social-text">Me siga nas redes sociais</p>
              <div className="footer__social">
                <a href="#" className="footer__social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="18" cy="6" r="1" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="footer__social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </a>
                <a href="#" className="footer__social-link" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57879 5.98541 1.46 6.46C1 8.18 1 11.75 1 11.75C1 11.75 1 15.32 1.46 17.04C1.59096 17.5039 1.8383 17.9222 2.17817 18.2586C2.51803 18.5949 2.93883 18.838 3.4 18.96C5.12 19.4 12 19.4 12 19.4C12 19.4 18.88 19.4 20.6 18.96C21.0708 18.8268 21.498 18.5718 21.8387 18.2206C22.1793 17.8694 22.4212 17.4346 22.54 16.96C23 15.24 23 11.67 23 11.67C23 11.67 23 8.1 22.54 6.42Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9.75 15.02L15.5 11.75L9.75 8.48V15.02Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </a>
                <a href="#" className="footer__social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#" className="footer__social-link" aria-label="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V3H18C18 5 19.5 7 22 7V10C20.5 10 19 9.5 18 8.5V12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6V9C10.3431 9 9 10.3431 9 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__divider"></div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            Dev Club ® 2026 • Todos os direitos reservados
          </p>
          <a href="#" className="footer__privacy">Política de Privacidade</a>
          <div className="footer__design">
            <span>Design by</span>
            <img src="/figma/Group-1.png" alt="Designer" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
