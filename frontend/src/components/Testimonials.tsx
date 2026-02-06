import { useState } from 'react'
import './Testimonials.css'

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      quote: "O DevClub mudou minha vida! Em menos de 6 meses consegui minha primeira vaga como desenvolvedora. A metodologia prática e o suporte dos mentores fazem toda a diferença.",
      name: "Ana Silva",
      role: "Desenvolvedora Full Stack",
      company: "Tech Corp",
      rating: "5.0",
      avatar: "/assets/testimonial-1.jpg"
    },
    {
      quote: "As aulas ao vivo e os projetos práticos me prepararam para o mercado real. Hoje trabalho com React e Next.js graças ao conhecimento adquirido no DevClub.",
      name: "Carlos Oliveira",
      role: "Front-end Developer",
      company: "StartupXYZ",
      rating: "5.0",
      avatar: "/assets/testimonial-2.jpg"
    },
    {
      quote: "A comunidade do DevClub é incrível! Além do conhecimento técnico, fiz networking valioso que me ajudou a conseguir oportunidades incríveis na minha carreira.",
      name: "Marina Santos",
      role: "Back-end Engineer",
      company: "Big Tech",
      rating: "5.0",
      avatar: "/assets/testimonial-3.jpg"
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
                    <span className="testimonial-card__role">{testimonial.role} @ {testimonial.company}</span>
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
                O Resultado comprova: Escola nº1 em Transição de Carreira no 🇧🇷
              </h2>

              <p className="testimonials__description">
                Alunos de todo o Brasil mudaram de vida com o DevClub.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
