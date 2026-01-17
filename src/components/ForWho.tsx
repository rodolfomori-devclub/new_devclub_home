import './ForWho.css'

function ForWho() {
  const cards = [
    {
      title: "Para quem quer comecar do zero",
      description: "Aprenda programacao do jeito certo, mesmo sem nenhuma experiencia previa. Voce comeca pelos fundamentos e evolui passo a passo ate estar pronto para o mercado."
    },
    {
      title: "Para quem quer se especializar",
      description: "Aprofunde seus conhecimentos com formacoes completas em Front-end, Back-end, Full Stack e Mobile, usando as tecnologias mais exigidas pelas empresas."
    },
    {
      title: "Para quem quer evoluir com IA",
      description: "Tenha acesso ao MBA em Inteligencia Artificial, com certificacoes internacionais e reconhecimento pelo MEC, ideal para quem busca diferenciacao e crescimento profissional."
    }
  ]

  return (
    <section className="for-who" id="for-who">
      <div className="for-who__container container">
        <div className="for-who__content">
          <div className="for-who__left">
            <span className="tag">indicacao_</span>

            <h2 className="for-who__title">
              Para quem e o<br />
              <span className="text-gradient-green">DevClub?</span>
            </h2>

            <p className="for-who__description">
              Independente do seu nivel atual, o DevClub foi criado para quem quer entrar, crescer ou se consolidar no mercado de tecnologia
            </p>

            <div className="for-who__stats">
              <div className="for-who__stats-row">
                <div className="for-who__stat">
                  <span className="for-who__stat-value">10k+</span>
                  <span className="for-who__stat-label">Alunos formados</span>
                </div>
                <div className="for-who__stat">
                  <span className="for-who__stat-value">95%</span>
                  <span className="for-who__stat-label">Empregabilidade</span>
                </div>
              </div>
              <div className="for-who__stats-divider"></div>
              <div className="for-who__stats-row">
                <div className="for-who__stat">
                  <span className="for-who__stat-value">4.9/5</span>
                  <span className="for-who__stat-label">Avaliacao</span>
                </div>
                <div className="for-who__stat">
                  <span className="for-who__stat-value">+15k</span>
                  <span className="for-who__stat-label">Alunos com vidas transformadas</span>
                </div>
              </div>
            </div>
          </div>

          <div className="for-who__right">
            {cards.map((card, index) => (
              <div className="for-who__card" key={index}>
                <div className="for-who__card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="for-who__card-content">
                  <h3 className="for-who__card-title">{card.title}</h3>
                  <p className="for-who__card-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="for-who__divider"></div>
      </div>
    </section>
  )
}

export default ForWho
