import './Journey.css'

function Journey() {
  const features = [
    {
      icon: (
        <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
          <path d="M1 9L8 16L21 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Conectado ao mercado",
      description: "Conteúdo alinhado às demandas reais de empresas que contratam profissionais de tech"
    },
    {
      icon: (
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none">
          <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.33 14.53 5.5 15.58V21H10.5V15.58C13.67 14.53 16 11.54 16 8C16 3.58 12.42 0 8 0ZM8 12C5.79 12 4 10.21 4 8C4 5.79 5.79 4 8 4C10.21 4 12 5.79 12 8C12 10.21 10.21 12 8 12Z" fill="currentColor"/>
        </svg>
      ),
      title: "Cargos estratégicos",
      description: "Formação voltada para quem busca liderança, diferenciação profissional."
    },
    {
      icon: (
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
          <path d="M12 0L0 7L12 14L24 7L12 0ZM0 13V18L12 25L24 18V13L12 20L0 13Z" fill="currentColor"/>
        </svg>
      ),
      title: "Reconhecido pelo MEC",
      description: "Pós-graduação credenciada, com validade nacional e padrão acadêmico de excelência"
    }
  ]

  const formations = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 12L11 14L15 10M12 3L4 7V11C4 15.4183 7.58172 19 12 19C16.4183 19 20 15.4183 20 11V7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Formação completa do básico ao avançado",
      description: "Trilhas organizadas para quem está começando e para quem já atua na área, com formações em Front-end, Back-end, Full Stack, sempre alinhadas às tecnologias mais demandadas pelas empresas."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "MBA em Inteligência Artificial reconhecido pelo MEC",
      description: "Aprofunde-se em IA com uma pós-graduação completa, certificações internacionais e foco em estratégia, inovação e aplicação prática no mercado de trabalho."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Conexão real com o mercado e contratações",
      description: "O DevClub prepara você para vagas reais. São milhares de alunos empregados, empresas parceiras e um ensino focado no que o mercado realmente exige."
    }
  ]

  return (
    <section className="journey" id="journey">
      <div className="journey__bg">
        <div className="journey__overlay"></div>
        <div className="journey__glow journey__glow--purple"></div>
        <div className="journey__glow journey__glow--green"></div>
      </div>

      <div className="journey__container">
        <div className="journey__header">
          <div className="journey__left">
            <span className="tag">Solução completa_</span>

            <h2 className="journey__title">
              Uma jornada completa para sua carreira em tecnologia
            </h2>
          </div>

          <div className="journey__right">
            <p className="journey__description">
              Tudo o que você precisa para evoluir, se especializar e se destacar no mercado, em um único lugar.
            </p>

            <p className="journey__description-secondary">
              O DevClub foi criado para eliminar a necessidade de cursos isolados e caminhos desconectados. Aqui, você encontra uma jornada contínua de aprendizado, sua evolução desde os primeiros fundamentos até a consolidação profissional.
            </p>

            <div className="journey__certifications">
              <div className="journey__stars">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#39D353"/>
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#39D353"/>
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#39D353"/>
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#39D353"/>
                </svg>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#39D353"/>
                </svg>
              </div>
              <span className="journey__certifications-text">Certificações internacionais</span>
            </div>
          </div>
        </div>

        <div className="journey__features">
          {features.map((feature, index) => (
            <div className="journey__feature" key={index}>
              <div className="journey__feature-icons">
                <span className="journey__feature-plus">+</span>
                <div className="journey__feature-icon">
                  {feature.icon}
                </div>
              </div>
              <div className="journey__feature-content">
                <h3 className="journey__feature-title">{feature.title}</h3>
                <p className="journey__feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="journey__formations">
          {formations.map((formation, index) => (
            <div className="journey__formation" key={index}>
              <div className="journey__formation-icon">
                {formation.icon}
              </div>
              <h3 className="journey__formation-title">{formation.title}</h3>
              <p className="journey__formation-description">{formation.description}</p>
            </div>
          ))}
        </div>

        <div className="journey__companies">
          <p className="journey__companies-label">Alunos contratados por empresas como:</p>
          <div className="journey__companies-logos">
            <span className="journey__company-name">Nubank</span>
            <span className="journey__company-name">Domestika</span>
            <span className="journey__company-name">CVC</span>
            <span className="journey__company-name">iFood</span>
            <span className="journey__company-name">Mercado Livre</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journey
