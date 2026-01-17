import './Tutors.css'

function Tutors() {
  const tutors = [
    {
      name: "Rodolfo Mori",
      role: "Desenvolvedor FullStack Sênior",
      image: "/figma/fotos dos tutores do curso.png"
    },
    {
      name: "Rodolfo Mori",
      role: "Desenvolvedor FullStack Sênior",
      image: "/figma/fotos dos tutores do curso.png"
    },
    {
      name: "Rodolfo Mori",
      role: "Desenvolvedor FullStack Sênior",
      image: "/figma/fotos dos tutores do curso.png"
    },
    {
      name: "Rodolfo Mori",
      role: "Desenvolvedor FullStack Sênior",
      image: "/figma/fotos dos tutores do curso.png"
    }
  ]

  return (
    <section className="tutors" id="tutors">
      <div className="tutors__container container">
        <div className="tutors__header">
          <div className="tutors__header-left">
            <span className="tag tag--purple">tutores</span>

            <h2 className="tutors__title">
              Com quem você irá aprender
            </h2>

            <p className="tutors__subtitle">
              Os professores são os maiores especialistas do mercado de programação
            </p>
          </div>

          <div className="tutors__nav">
            <button className="tutors__nav-btn tutors__nav-btn--prev" aria-label="Anterior">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5H13M1 5L5 1M1 5L5 9" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="tutors__nav-btn tutors__nav-btn--next" aria-label="Próximo">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M13 5H1M13 5L9 1M13 5L9 9" stroke="#0CAE53" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="tutors__grid">
          {tutors.map((tutor, index) => (
            <div className="tutor-card" key={index}>
              <div className="tutor-card__image">
                <div className="tutor-card__placeholder">
                  <img src="/figma/image-line.png" alt="" />
                </div>
              </div>
              <p className="tutor-card__role">{tutor.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tutors
