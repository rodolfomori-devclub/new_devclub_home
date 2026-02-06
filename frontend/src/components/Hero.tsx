import { useState, useEffect } from 'react'
import './Hero.css'

function Hero() {
  const words = ['FullStack', 'Front-End', 'Back-End']
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex])

  return (
    <section className="hero">
      <div className="hero__bg">
        <img
          src="/figma/hero-background.png"
          alt=""
          className="hero__bg-image"
          fetchPriority="high"
          loading="eager"
        />
        <div className="hero__overlay"></div>
        <div className="hero__purple-glow"></div>
        <div className="hero__purple-glow-right"></div>
      </div>

      {/* Grid squares overlay */}
      <div className="hero__grid">
        {/* Row 1 */}
        <div className="hero__grid-item"></div>
        <div className="hero__grid-item"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--2"></div>
        <div className="hero__grid-item"></div>
        {/* Row 2 */}
        <div className="hero__grid-item"></div>
        <div className="hero__grid-item hero__grid-item--2"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        <div className="hero__grid-item hero__grid-item--2"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--10"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        {/* Row 3 */}
        <div className="hero__grid-item"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--2"></div>
        <div className="hero__grid-item hero__grid-item--10"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        <div className="hero__grid-item hero__grid-item--10"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        {/* Row 4 */}
        <div className="hero__grid-item"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        <div className="hero__grid-item hero__grid-item--2"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        <div className="hero__grid-item hero__grid-item--2"></div>
        {/* Row 5 */}
        <div className="hero__grid-item"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--5"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item hero__grid-item--2"></div>
        <div className="hero__grid-item hero__grid-item--3"></div>
        <div className="hero__grid-item"></div>
      </div>

      <div className="hero__container container">
        <div className="hero__brand">
          <img src="/figma/Group.png" alt="" className="hero__logo-icon" />
          <span className="hero__logo-text">DevClub</span>
        </div>

        <div className="hero__content">
          <span className="tag">A Escola das Profissões do Futuro</span>

          <h1 className="hero__title">
            Transforme sua carreira com<br />
            <span className="hero__rotating-text">
              <span className="text-gradient-green">{displayText}</span>
              <span className="hero__cursor">_</span>
            </span>
          </h1>

          <p className="hero__description">
            Aprenda as tecnologias mais demandadas do mercado com metodologia prática, direto ao ponto e de forma simples.
          </p>

          <div className="hero__buttons">
            <a href="#courses" className="btn btn--primary">
              <span className="btn__icon">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              Ver Formações
            </a>
            <a href="#about" className="btn btn--outline">
              Ver mais
            </a>
          </div>
        </div>

        <div className="hero__ratings">
          <div className="hero__ratings-stars">
            <span className="hero__stars">★★★★★</span>
            <span className="hero__ratings-text">Reconhecimento 5 estrelas no mercado!</span>
          </div>
          <div className="hero__ratings-companies">
            <span className="hero__ratings-label">Alunos contratados por empresas como:</span>
            <div className="hero__companies-carousel">
              <div className="hero__companies-track">
                <span className="hero__company-name">TOTVS</span>
                <span className="hero__company-name">Unimed</span>
                <span className="hero__company-name">CVC</span>
                <span className="hero__company-name">iFood</span>
                <span className="hero__company-name">Nubank</span>
                <span className="hero__company-name">XP Inc</span>
                <span className="hero__company-name">Mercado Livre</span>
                <span className="hero__company-name">Stone</span>
                {/* Duplicado para loop infinito */}
                <span className="hero__company-name">TOTVS</span>
                <span className="hero__company-name">Unimed</span>
                <span className="hero__company-name">CVC</span>
                <span className="hero__company-name">iFood</span>
                <span className="hero__company-name">Nubank</span>
                <span className="hero__company-name">XP Inc</span>
                <span className="hero__company-name">Mercado Livre</span>
                <span className="hero__company-name">Stone</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__divider"></div>
    </section>
  )
}

export default Hero
