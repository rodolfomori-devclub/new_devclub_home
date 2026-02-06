import './Presentation.css'

function Presentation() {
  return (
    <section className="presentation" id="presentation">
      <div className="presentation__container container">
        <div className="presentation__header">
          <div className="presentation__left">
            <span className="tag">apresentação_</span>

            <div className="presentation__brand">
              <img src="/figma/Group.png" alt="" className="presentation__logo-icon" />
              <span className="presentation__logo-text">DevClub</span>
            </div>

            <div className="presentation__profile">
              <img src="/figma/DevClub3654.png" alt="Rodolfo Mori" className="presentation__profile-img" loading="eager" />
              <div className="presentation__profile-info">
                <span className="presentation__profile-name">Rodolfo Mori</span>
                <span className="presentation__profile-role">Fundador do DevClub</span>
              </div>
            </div>

            <div className="presentation__students">
              <div className="presentation__avatars">
                <img src="/assets/testimonial-1.jpg" alt="Ana Silva" className="presentation__avatar" />
                <img src="/assets/testimonial-2.jpg" alt="Carlos Oliveira" className="presentation__avatar" />
                <img src="/assets/testimonial-3.jpg" alt="Marina Santos" className="presentation__avatar" />
                <div className="presentation__avatar presentation__avatar--more">+</div>
              </div>
              <p className="presentation__students-text">
                +25 mil alunos e alunas no Brasil e no mundo. Junte-se a eles.
              </p>
            </div>
          </div>

          <div className="presentation__right">
            <h2 className="presentation__title">
              Aprenda as <span className="text-green">tecnologias</span>{' '}
              <span className="text-purple">+ demandadas do mercado</span>, com método prático que gera resultados reais.
            </h2>
            <p className="presentation__description">
              O DevClub é uma escola de tecnologia focada em formar programadores prontos para o mercado — do zero ao nível profissional. Aqui, o aprendizado é direto ao ponto, com uma metodologia prática desenvolvida para garantir domínio técnico, experiência real em projetos e preparo para conquistar as melhores oportunidades em tecnologia.
            </p>
          </div>
        </div>

        <div className="presentation__video">
          <div className="presentation__video-wrapper">
            <div className="presentation__video-placeholder">
              <button className="presentation__play-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Presentation
