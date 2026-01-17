import './About.css'

function About() {
  const features = [
    {
      icon: "/figma/code-icon.svg",
      title: "Metodologia pratica e aplicada",
      description: "Aprenda fazendo. Sao centenas de projetos reais, desafios praticos e aplicacoes usadas no dia a dia de empresas de tecnologia."
    },
    {
      icon: "/figma/briefcase-icon.svg",
      title: "Formacoes focadas no mercado",
      description: "Trilhas completas em Front-end, Back-end, Full Stack e Mobile, construidas com base nas tecnologias mais exigidas pelas empresas."
    },
    {
      icon: "/figma/chat-icon.svg",
      title: "Acompanhamento que gera resultado",
      description: "Suporte vitalicio, mentorias ao vivo, comunidade ativa e certificado reconhecido para acelerar sua evolucao profissional."
    }
  ]

  return (
    <section className="about" id="about">
      <div className="about__divider-top"></div>
      <div className="about__container container">
        <div className="about__features">
          {features.map((feature, index) => (
            <div className="about__feature" key={index}>
              <div className="about__feature-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {index === 0 && <path d="M16 18L22 12L16 6M8 6L2 12L8 18"/>}
                  {index === 1 && <path d="M20 7H10C6.68629 7 4 9.68629 4 13C4 16.3137 6.68629 19 10 19H20M20 7V19M20 7L17 4M20 19L17 22"/>}
                  {index === 2 && <path d="M21 15C21 17.2091 19.2091 19 17 19H7C4.79086 19 3 17.2091 3 15V9C3 6.79086 4.79086 5 7 5H17C19.2091 5 21 6.79086 21 9V15ZM7 9H7.01M7 12H7.01"/>}
                </svg>
              </div>
              <h3 className="about__feature-title">{feature.title}</h3>
              <p className="about__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="about__divider"></div>
      </div>
    </section>
  )
}

export default About
