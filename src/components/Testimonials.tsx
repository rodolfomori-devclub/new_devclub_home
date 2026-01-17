import { useState } from 'react'
import './Testimonials.css'

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(1)

  const testimonials = [
    {
      quote: "O DevClub superou minhas expectativas. Em poucos meses, já estava criando meus primeiros projetos e me sentindo confiante para buscar oportunidades. O suporte e a comunidade são sensacionais.",
      name: "Mariana Oliveira",
      role: "Avaliação Google Play",
      rating: "5.0",
      avatar: "/figma/Ellipse 2468.png"
    },
    {
      quote: "A área de membros é impecável! Tudo muito organizado, com trilhas claras e fáceis de seguir. Consigo encontrar as aulas e materiais rapidamente, e ainda posso acompanhar meu progresso. Isso fez toda a diferença no meu aprendizado.",
      name: "Camila Andrade – São Paulo/SP",
      role: "Avaliação Área de membros",
      rating: "5.0",
      avatar: "/figma/Ellipse 2467.png"
    },
    {
      quote: "O DevClub superou minhas expectativas. Em poucos meses, já estava criando meus primeiros projetos e me sentindo confiante para buscar oportunidades. O suporte e a comunidade são sensacionais.",
      name: "Rafaela Silva",
      role: "Avaliação Hotmart",
      rating: "5.0",
      avatar: "/figma/Ellipse 2468.png"
    }
  ]

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__content">
          <div className="testimonials__cards">
            {testimonials.map((testimonial, index) => (
              <div
                className={`testimonial-card ${activeIndex === index ? 'testimonial-card--active' : ''}`}
                key={index}
                onClick={() => setActiveIndex(index)}
              >
                <div className="testimonial-card__quote-icon">
                  <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
                    <path d="M0 26V17.3333C0 14.4889 0.488889 11.9111 1.46667 9.6C2.48889 7.24444 3.86667 5.2 5.6 3.46667C7.37778 1.68889 9.37778 0.355556 11.6 -0.533333L13.3333 3.46667C11.3778 4.35556 9.73333 5.64444 8.4 7.33333C7.11111 8.97778 6.35556 10.8444 6.13333 12.9333H12V26H0ZM16.6667 26V17.3333C16.6667 14.4889 17.1556 11.9111 18.1333 9.6C19.1556 7.24444 20.5333 5.2 22.2667 3.46667C24.0444 1.68889 26.0444 0.355556 28.2667 -0.533333L30 3.46667C28.0444 4.35556 26.4 5.64444 25.0667 7.33333C23.7778 8.97778 23.0222 10.8444 22.8 12.9333H28.6667V26H16.6667Z" fill="currentColor"/>
                  </svg>
                </div>
                <p className="testimonial-card__quote">{testimonial.quote}</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-card__rating">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 0L9.79 5.52L16 6.18L11.5 10.24L12.82 16L8 12.77L3.18 16L4.5 10.24L0 6.18L6.21 5.52L8 0Z" fill="#FFD700"/>
                    </svg>
                    <span>{testimonial.rating}</span>
                  </div>
                  <div className="testimonial-card__info">
                    <span className="testimonial-card__name">{testimonial.name}</span>
                    <span className="testimonial-card__role">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials__info">
            <div className="testimonials__slider">
              <span className="testimonials__slider-number">0{activeIndex + 1}</span>
              <div className="testimonials__slider-track">
                <div
                  className="testimonials__slider-progress"
                  style={{ top: `${(activeIndex / testimonials.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="testimonials__text">
              <span className="tag tag--purple">depoimentos_</span>

              <h2 className="testimonials__title">
                Quem fez, comprova: mais de 100 avaliações positivas
              </h2>

              <p className="testimonials__description">
                Alunos de todo o Brasil mudaram de vida com o DevClub FullStackPro — e essas histórias falam por si.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
