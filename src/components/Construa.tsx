import './Construa.css'

function Construa() {
  return (
    <section className="construa" id="construa">
      <div className="construa__bg">
        <img src="/figma/image 35.png" alt="" className="construa__bg-image" />
        <div className="construa__overlay"></div>
        <div className="construa__glow construa__glow--purple"></div>
        <div className="construa__glow construa__glow--green"></div>
      </div>

      <div className="construa__container">
        <div className="construa__content">
          <div className="construa__left">
            <span className="tag">Comece sua jornada agora_</span>

            <h2 className="construa__title">
              Construa sua carreira em tecnologia com o DevClub
            </h2>

            <a href="#" className="btn btn--primary">
              <span className="btn__icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Ver Formações
            </a>

            <div className="construa__users">
              <div className="construa__avatars">
                <img src="/assets/testimonial-1.jpg" alt="Ana Silva" className="construa__avatar" />
                <img src="/assets/testimonial-2.jpg" alt="Carlos Oliveira" className="construa__avatar" />
                <img src="/assets/testimonial-3.jpg" alt="Marina Santos" className="construa__avatar" />
                <div className="construa__avatar construa__avatar--more">+</div>
              </div>
              <div className="construa__users-text">
                <span className="construa__users-count">+55 mil</span> alunos e alunas no Brasil e no mundo. Junte-se a eles.
              </div>
            </div>
          </div>

          <div className="construa__right">
            <p className="construa__description">
              Tenha acesso às formações mais completas do mercado, projetos reais, mentoria contínua e uma plataforma pensada para levar você do aprendizado à atuação profissional. Aprenda no seu ritmo, com acompanhamento de perto e foco em empregabilidade real.
            </p>

            <div className="construa__badges">
              <div className="construa__badge">
                <div className="construa__badge-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                  </svg>
                </div>
                <span>Sem pré-requisitos</span>
              </div>
              <div className="construa__badge">
                <div className="construa__badge-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" fill="currentColor"/>
                  </svg>
                </div>
                <span>Aprenda no seu tempo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="construa__ratings">
          <div className="construa__ratings-stars">
            <div className="construa__stars">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#FFD700"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#FFD700"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#FFD700"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#FFD700"/>
              </svg>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#FFD700"/>
              </svg>
            </div>
            <span className="construa__ratings-text">Reconhecimento 5 estrelas no mercado!</span>
          </div>
          <div className="construa__ratings-companies">
            <span className="construa__ratings-label">Alunos contratados por empresas como:</span>
            <div className="construa__companies-carousel">
              <div className="construa__companies-track">
                <span className="construa__company-name">TOTVS</span>
                <span className="construa__company-name">Unimed</span>
                <span className="construa__company-name">CVC</span>
                <span className="construa__company-name">iFood</span>
                <span className="construa__company-name">Nubank</span>
                <span className="construa__company-name">XP Inc</span>
                <span className="construa__company-name">Mercado Livre</span>
                <span className="construa__company-name">Stone</span>
                {/* Duplicado para loop infinito */}
                <span className="construa__company-name">TOTVS</span>
                <span className="construa__company-name">Unimed</span>
                <span className="construa__company-name">CVC</span>
                <span className="construa__company-name">iFood</span>
                <span className="construa__company-name">Nubank</span>
                <span className="construa__company-name">XP Inc</span>
                <span className="construa__company-name">Mercado Livre</span>
                <span className="construa__company-name">Stone</span>
              </div>
            </div>
          </div>
        </div>

        <div className="construa__features">
          <div className="construa__feature-card">
            <div className="construa__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="construa__feature-title">Acesso imediato às formações</h3>
            <p className="construa__feature-description">
              Comece a estudar assim que fizer sua inscrição, sem burocracia e no seu ritmo.
            </p>
          </div>

          <div className="construa__feature-card">
            <div className="construa__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="construa__feature-title">Conteúdo sempre atualizado</h3>
            <p className="construa__feature-description">
              As aulas acompanham a evolução do mercado, garantindo aprendizado relevante e atual.
            </p>
          </div>

          <div className="construa__feature-card">
            <div className="construa__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="construa__feature-title">Plataforma prática e organizada</h3>
            <p className="construa__feature-description">
              Estude em um ambiente simples, intuitivo e focado na aplicação real do conhecimento.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Construa
