import './Festival.css'

function Festival() {
  return (
    <section className="festival" id="festival">
      <div className="festival__bg">
        <img src="/figma/image 35.png" alt="" className="festival__bg-image" />
        <div className="festival__overlay"></div>
        <div className="festival__glow festival__glow--green"></div>
        <div className="festival__glow festival__glow--purple"></div>
      </div>

      <div className="festival__container container">
        <div className="festival__header">
          <span className="tag">Seu último curso_</span>
          <h2 className="festival__title">
            Um Festival de tecnologias e Formações pra sua carreira
          </h2>

          <div className="festival__students">
            <div className="festival__avatars">
              <img src="/assets/testimonial-1.jpg" alt="Ana Silva" className="festival__avatar" />
              <img src="/assets/testimonial-2.jpg" alt="Carlos Oliveira" className="festival__avatar" />
              <img src="/assets/testimonial-3.jpg" alt="Marina Santos" className="festival__avatar" />
              <div className="festival__avatar festival__avatar--more">+</div>
            </div>
            <span className="festival__students-text">
              <strong>+55 mil</strong> alunos e alunas no Brasil e no mundo. Junte-se a eles.
            </span>
          </div>

          <a href="#courses" className="btn btn--primary festival__btn">
            <span className="btn__icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Ver Formações
          </a>
        </div>

        <div className="festival__technologies">
          <div className="festival__tech-grid">
            <div className="festival__tech-card festival__tech-card--1">
              <img src="/figma/card-frontend.svg" alt="" className="festival__tech-image" />
              <span className="festival__tech-name">React.js</span>
            </div>
            <div className="festival__tech-card festival__tech-card--2">
              <img src="/figma/card-mba.svg" alt="" className="festival__tech-image" />
              <span className="festival__tech-name">MBA</span>
            </div>
            <div className="festival__tech-card festival__tech-card--3">
              <img src="/figma/card-fullstack.svg" alt="" className="festival__tech-image" />
              <span className="festival__tech-name">Javascript ES6+</span>
            </div>
            <div className="festival__tech-card festival__tech-card--4">
              <img src="/figma/card-backend.svg" alt="" className="festival__tech-image" />
              <span className="festival__tech-name">Node.js</span>
            </div>
            <div className="festival__tech-card festival__tech-card--5">
              <img src="/figma/card-mobile.svg" alt="" className="festival__tech-image" />
              <span className="festival__tech-name">Mobile</span>
            </div>
            <div className="festival__tech-card festival__tech-card--6">
              <span className="festival__tech-name festival__tech-name--more">E muito mais...</span>
            </div>
          </div>
        </div>

        <div className="festival__cta">
          <span className="festival__cta-text">Comece agora sua jornada em tecnologia</span>
          <a href="#courses" className="festival__cta-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="festival__divider"></div>
    </section>
  )
}

export default Festival
