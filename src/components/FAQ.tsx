import { useState } from 'react'
import './FAQ.css'

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "Qual é o tempo de acesso à plataforma?",
      answer: "Você terá acesso por 12 meses completos a todo o conteúdo da Formação DevClub, incluindo as atualizações e novos módulos que forem sendo liberados durante esse período."
    },
    {
      question: "Preciso ter algum conhecimento prévio sobre programação?",
      answer: "Não! O DevClub foi criado para iniciantes. Começamos do zero absoluto e vamos avançando gradualmente, sempre com didática clara e prática."
    },
    {
      question: "Qual o sistema de pagamento utilizado? É seguro?",
      answer: "Utilizamos a Hotmart, uma das maiores plataformas de produtos digitais do Brasil. É 100% seguro e você pode pagar via cartão de crédito, boleto, PIX ou PayPal."
    },
    {
      question: "Como funciona a garantia?",
      answer: "Você tem 7 dias de garantia incondicional. Se por qualquer motivo você não gostar do curso, basta solicitar o reembolso que devolvemos 100% do seu investimento."
    },
    {
      question: "Como eu assisto às aulas?",
      answer: "As aulas ficam disponíveis na nossa área de membros, que você pode acessar de qualquer dispositivo com internet. Assista quando e onde quiser."
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq" id="faq">
      <div className="faq__container">
        <span className="tag">faq_</span>

        <h2 className="faq__title">Perguntas Frequentes</h2>

        <div className="faq__list">
          {faqs.map((faq, index) => (
            <div
              className={`faq__item ${openIndex === index ? 'faq__item--open' : ''}`}
              key={index}
            >
              <button
                className="faq__question"
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <svg
                  className="faq__icon"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M7 1V13M1 7H13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="faq__answer">
                  <p>{faq.answer}</p>
                </div>
              )}
              <div className="faq__divider"></div>
            </div>
          ))}
        </div>

        <div className="faq__contact">
          <div className="faq__contact-text">
            <h3 className="faq__contact-title">Ainda tem dúvidas? Vamos conversar!</h3>
            <p className="faq__contact-description">
              Se você tem alguma dúvida, sugestão ou até mesmo uma reclamação, entre em contato. Queremos te ouvir.
            </p>
          </div>
          <a href="mailto:contato@devclub.com.br" className="btn btn--primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Mandar mensagem
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ
