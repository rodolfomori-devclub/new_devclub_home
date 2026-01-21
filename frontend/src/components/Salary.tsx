import './Salary.css'

function Salary() {
  const benefits = [
    {
      title: "Mercado Aquecido",
      description: "A area de Desenvolvimento oferece excelentes oportunidades de emprego e salarios altos."
    },
    {
      title: "Trabalhe onde quiser",
      description: "Abra as portas da liberdade e trabalhe de onde quiser com o desenvolvimento front-end."
    },
    {
      title: "Ganhe em moeda estrangeira",
      description: "Aproveite as oportunidades globais, conquiste projetos internacionais e aumente sua renda."
    }
  ]

  return (
    <section className="salary">
      <div className="salary__container container">
        <div className="salary__content">
          <div className="salary__left">
            <span className="tag tag--salary">salário_</span>

            <h2 className="salary__title">
              Essa e a media salarial de um programador no Brasil
            </h2>

            <p className="salary__subtitle">
              A area de Desenvolvimento oferece excelentes oportunidades de emprego e salarios altos.
            </p>

            <div className="salary__levels">
              <div className="salary-level">
                <span className="salary-level__label">Junior</span>
                <div className="salary-level__bar salary-level__bar--gray">
                  <span className="salary-level__value">R$ 2k - R$4k</span>
                </div>
              </div>

              <div className="salary-level">
                <span className="salary-level__label">Pleno</span>
                <div className="salary-level__bar salary-level__bar--purple">
                  <span className="salary-level__value">R$ 4k - R$6k</span>
                </div>
              </div>

              <div className="salary-level">
                <span className="salary-level__label">Senior</span>
                <div className="salary-level__bar salary-level__bar--green">
                  <span className="salary-level__value">+ R$ 7k</span>
                </div>
              </div>
            </div>

            <p className="salary__source">
              Fonte: GlassDoor e Linkedin<br />
              * Estes sao valores aproximados que pode variar de empresa para empresa e tambem de acordo com o estado.
            </p>
          </div>

          <div className="salary__right">
            {benefits.map((benefit, index) => (
              <div className="benefit-item" key={index}>
                <div className="benefit-item__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {index === 0 && <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12"/>}
                    {index === 1 && <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"/>}
                    {index === 2 && <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"/>}
                  </svg>
                </div>
                <div className="benefit-item__content">
                  <h3 className="benefit-item__title">{benefit.title}</h3>
                  <p className="benefit-item__description">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Salary
