import './Courses.css'

function Courses() {
  const courses = [
    {
      image: "/figma/card-fullstack.svg",
      title: "Formação Fullstack JavaScript",
      description: "Domine o desenvolvimento web completo com JavaScript. Aprenda desde o front-end com React até o back-end com Node.js, incluindo bancos de dados e deploy."
    },
    {
      image: "/figma/card-frontend.svg",
      title: "Formação Front-end",
      description: "Especialize-se em desenvolvimento front-end moderno com React. Crie interfaces incríveis e aplicações web performáticas."
    },
    {
      image: "/figma/card-backend.svg",
      title: "Formação Back-end",
      description: "Torne-se um especialista em desenvolvimento back-end com Node.js. Construa APIs robustas e escaláveis."
    },
    {
      image: "/figma/card-mobile.svg",
      title: "Formação Mobile",
      description: "Desenvolva aplicativos móveis nativos para iOS e Android usando React Native."
    },
    {
      image: "/figma/card-mba.svg",
      title: "MBA e Pós Graduação em Tecnologia",
      description: "Aprofunde seus conhecimentos com a pós-graduação em desenvolvimento FullStack."
    },
    {
      image: "/figma/card-outras.svg",
      title: "A Escola das Profissões do futuro",
      description: "Conheça mais sobre a nossa escola de programação DevClub"
    }
  ]

  const metrics = [
    { value: "Nota 4.9 de 5", description: "Avaliacao media baseada na experiencia real de milhares de alunos que passaram pelas formacoes." },
    { value: "+1.000 aulas", description: "Conteudos objetivos e organizados, do nivel iniciante ao avancado, com foco total na pratica." },
    { value: "+1.100h", description: "Uma jornada completa de aprendizado, cobrindo fundamentos, especializacoes e tecnologias atuais." },
    { value: "+100 projetos", description: "Projetos reais para aplicar o conhecimento, ganhar experiencia e construir um portfolio profissional." }
  ]

  return (
    <section className="courses" id="courses">
      <div className="courses__container container">
        <div className="courses__header">
          <span className="tag tag--purple-gradient">Do zero ao avancado_</span>
          <h2 className="courses__title">
            Conheca nossas formacoes em programacao
          </h2>
        </div>

        <div className="courses__grid">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>
              <div className="course-card__image">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="course-card__content">
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__description">{course.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="courses__metrics">
          {metrics.map((metric, index) => (
            <div className="metric-card" key={index}>
              <div className="metric-card__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {index === 0 && <path d="M12 15C15.866 15 19 11.866 19 8V3H5V8C5 11.866 8.13401 15 12 15ZM12 15V21M8 21H16M3 3H21"/>}
                  {index === 1 && <path d="M4 4H20V20H4V4ZM8 8H16M8 12H16M8 16H12"/>}
                  {index === 2 && <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M7.76 16.24L4.93 19.07M19.07 19.07L16.24 16.24M7.76 7.76L4.93 4.93"/>}
                  {index === 3 && <path d="M16 18L22 12L16 6M8 6L2 12L8 18"/>}
                </svg>
              </div>
              <span className="metric-card__value">{metric.value}</span>
              <p className="metric-card__description">{metric.description}</p>
            </div>
          ))}
        </div>

        <div className="courses__divider"></div>
      </div>
    </section>
  )
}

export default Courses
