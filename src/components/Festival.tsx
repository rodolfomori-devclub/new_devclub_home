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
          <div className="festival__cta-icon">
            <img src="/figma/Group 43039.png" alt="" />
          </div>
        </div>
      </div>

      <div className="festival__divider"></div>
    </section>
  )
}

export default Festival
