import './CTAHero.css'

function CTAHero() {
  return (
    <section className="cta-hero">
      <div className="cta-hero__bg">
        <img src="/figma/image 45.png" alt="" className="cta-hero__bg-image" loading="eager" />
        <div className="cta-hero__overlay"></div>
      </div>

      <div className="cta-hero__container">
        <div className="cta-hero__icon">
          <img src="/figma/Group.png" alt="DevClub" />
        </div>

        <span className="cta-hero__subtitle">Entre e faça parte</span>

        <h2 className="cta-hero__title">
          Comece agora sua jornada em tecnologia
        </h2>

        <p className="cta-hero__description">
          Aprenda com uma metodologia prática e conectada às oportunidades reais do mercado.
        </p>

        <a href="#" className="btn btn--primary cta-hero__btn">
          <span className="btn__icon">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 13L13 1M13 1H1M13 1V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Ver Formações
        </a>

        <div className="cta-hero__students">
          <div className="cta-hero__avatars">
            <div className="cta-hero__avatar">
              <img src="/assets/testimonial-1.jpg" alt="Ana Silva" />
            </div>
            <div className="cta-hero__avatar">
              <img src="/assets/testimonial-2.jpg" alt="Carlos Oliveira" />
            </div>
            <div className="cta-hero__avatar">
              <img src="/assets/testimonial-3.jpg" alt="Marina Santos" />
            </div>
          </div>
          <div className="cta-hero__students-info">
            <span className="cta-hero__students-count">+10 mil</span>
            <span className="cta-hero__students-text">Alunos em todo o Brasil</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTAHero
