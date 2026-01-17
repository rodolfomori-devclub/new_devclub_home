import './Platform.css'

function Platform() {
  const features = [
    {
      icon: "/figma/brackets-line.png",
      title: "Ensino FullStack",
      description: "Aprenda front-end e back-end com as tecnologias mais pedidas pelas empresas."
    },
    {
      icon: "/figma/code-line.png",
      title: "Tecnologias Mais Procuradas",
      description: "React, Node.js, TypeScript e muito mais tecnologias do mercado."
    },
    {
      icon: "/figma/chat-1-line.png",
      title: "Mentoria Técnica",
      description: "Acompanhamento próximo com especialistas para tirar dúvidas."
    },
    {
      icon: "/figma/award-line.png",
      title: "Certificado Reconhecido pelo MEC",
      description: "Tenha um documento oficial que valida sua formação."
    },
    {
      icon: "/figma/file-code-line.png",
      title: "Mais de 10 Projetos",
      description: "Construa um portfólio sólido com projetos reais."
    },
    {
      icon: "/figma/global-line.png",
      title: "Comunidade Exclusiva",
      description: "Faça parte de um grupo de alunos e profissionais de tecnologia."
    }
  ]

  return (
    <section className="platform" id="platform">
      <div className="platform__container container">
        <div className="platform__content">
          <div className="platform__image">
            <img src="/figma/DevClub3755.png" alt="Programador" className="platform__person" />
            <div className="platform__image-overlay"></div>
          </div>

          <div className="platform__info">
            <span className="tag tag--purple">plataforma</span>

            <h2 className="platform__title">
              O que você vai ter acesso na Formação DevClub FullStack Pro
            </h2>

            <div className="platform__features">
              {features.map((feature, index) => (
                <div className="platform__feature" key={index}>
                  <div className="platform__feature-icon">
                    <img src={feature.icon} alt="" />
                  </div>
                  <div className="platform__feature-content">
                    <h4 className="platform__feature-title">{feature.title}</h4>
                    <p className="platform__feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Platform
