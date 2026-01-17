import './Pricing.css'

function Pricing() {
  const benefits = [
    "Formação FullStack Completa",
    "Acesso vitalício à plataforma",
    "Mais de 500 aulas em vídeo",
    "Projetos práticos do zero",
    "Certificado reconhecido pelo MEC",
    "Suporte diário no Discord",
    "Atualizações constantes",
    "Comunidade exclusiva"
  ]

  return (
    <section className="pricing" id="pricing">
      <div className="pricing__container container">
        <div className="pricing__content">
          <div className="pricing__left">
            <span className="tag tag--purple">garantir minha vaga</span>

            <h2 className="pricing__title">
              Torne-se um profissional de elite, do zero ao avançado agora mesmo
            </h2>

            <p className="pricing__subtitle">
              Adquira agora a formação de desenvolvimento Front-end e comece a construir interfaces incríveis!
            </p>

            <div className="pricing__card">
              <div className="pricing__card-left">
                <h3 className="pricing__card-title">O que você vai receber:</h3>
                <ul className="pricing__features">
                  {benefits.map((benefit, index) => (
                    <li className="pricing__feature" key={index}>
                      <span className="pricing__feature-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M16.667 5L7.5 14.167L3.333 10" stroke="#39D353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pricing__card-right">
                <div className="pricing__badge">
                  <img src="/figma/vip-diamond-line.png" alt="" />
                  <span>Dev Club</span>
                </div>

                <div className="pricing__price-wrapper">
                  <span className="pricing__installments">12x</span>
                  <div className="pricing__price">
                    <span className="pricing__currency">R$</span>
                    <span className="pricing__amount">142,75</span>
                  </div>
                  <span className="pricing__cash">ou R$ 1497 à vista</span>
                </div>

                <a href="#" className="pricing__cta">
                  <span className="pricing__cta-icon">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                  Quero ser programador
                </a>

                <p className="pricing__availability">curso completo disponível</p>
              </div>
            </div>
          </div>

          <div className="pricing__right">
            <div className="pricing__image-wrapper">
              <img src="/figma/DevClub3732.png" alt="" className="pricing__image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing
