import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="footer__logo">
              <img src="/figma/Group.png" alt="" className="footer__logo-icon" />
              <span className="footer__logo-text">Dev Club</span>
            </a>
            <p className="footer__tagline">
              Profissional de elite de<br />
              programação
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Navegação</h4>
              <ul className="footer__menu">
                <li><a href="#about">Como funciona</a></li>
                <li><a href="#courses">DevClub</a></li>
                <li><a href="#for-who">Vantagens</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Acompanhe</h4>
              <ul className="footer__menu">
                <li><a href="#">Newsletter</a></li>
              </ul>

              <div className="footer__newsletter">
                <div className="footer__newsletter-form">
                  <input type="email" placeholder="Seu email" className="footer__newsletter-input" />
                  <button className="footer__newsletter-btn">Enviar</button>
                </div>
                <p className="footer__newsletter-disclaimer">
                  Ao se cadastrar você concorda com nossa <a href="#">Política de Privacidade</a>.
                </p>
              </div>

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
                <a href="#" className="footer__social-link" aria-label="Discord">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </a>
                <a href="#" className="footer__social-link footer__social-link--green" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
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
