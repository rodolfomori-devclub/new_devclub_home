import './Content.css'

function Content() {
  const modules = [
    { title: "HTML & CSS", image: "/figma/capas dos módulos do curso.png" },
    { title: "JavaScript", image: "/figma/image 2.png" },
    { title: "React", image: "/figma/image 3.png" },
    { title: "Node.js", image: "/figma/image 4.png" },
    { title: "TypeScript", image: "/figma/image 6.png" },
    { title: "MongoDB", image: "/figma/image 7.png" }
  ]

  return (
    <section className="content" id="content">
      <div className="content__container container">
        <div className="content__header">
          <div className="content__header-left">
            <span className="tag tag--purple">conteúdo</span>

            <h2 className="content__title">
              Como é o nosso curso?
            </h2>

            <p className="content__description">
              Curso completo disponível com mais de 200 horas de conteúdo prático
            </p>
          </div>

          <div className="content__nav">
            <button className="content__nav-btn content__nav-btn--prev" aria-label="Anterior">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5H13M1 5L5 1M1 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="content__nav-btn content__nav-btn--next" aria-label="Próximo">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M13 5H1M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="content__modules">
          <div className="content__modules-grid">
            {modules.map((module, index) => (
              <div className="module-card" key={index}>
                <div className="module-card__image">
                  <img src={module.image} alt={module.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Content
