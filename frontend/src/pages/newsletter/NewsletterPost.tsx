import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { postsService } from '../../services/posts.service'
import { Post } from '../../types/post.types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './Newsletter.css'

function NewsletterPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return

      try {
        const post = await postsService.getBySlug(slug)
        setPost(post)
      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  // Convert Sanity Portable Text to plain text
  const getTextFromContent = (content: any): string => {
    if (!content) return ''
    if (typeof content === 'string') return content

    if (Array.isArray(content)) {
      return content.map((block: any) => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child: any) => child.text || '').join('')
        }
        if (block._type === 'code' && block.code) {
          return block.code
        }
        return ''
      }).join('\n\n')
    }
    return ''
  }

  const estimateReadTime = (content: any) => {
    const text = getTextFromContent(content)
    if (!text) return 1
    const wordsPerMinute = 200
    const words = text.split(/\s+/).filter(w => w.length > 0).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
  }

  if (loading) {
    return (
      <div className="newsletter-post">
        <div className="newsletter-page__loading">
          <div className="newsletter-page__spinner"></div>
          <p>Carregando edição...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="newsletter-post">
        <div className="newsletter-post__not-found container">
          <h2>Edição não encontrada</h2>
          <p>A edição que você está procurando não existe ou foi removida.</p>
          <Link to="/newsletter" className="btn btn--primary">
            Voltar à Newsletter
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="newsletter-post">
      <div className="newsletter-post__header">
        <Link to="/newsletter" className="newsletter-post__back">
          <ArrowLeft size={16} />
          Voltar à Newsletter
        </Link>

        <div className="newsletter-post__meta">
          <span className="newsletter-post__date">
            <Calendar size={14} />
            {format(new Date(post.publishedAt || post.createdAt || new Date()), "dd 'de' MMMM, yyyy", {
              locale: ptBR,
            })}
          </span>
          <span className="newsletter-post__read-time">
            <Clock size={14} />
            {estimateReadTime(post.content)} min de leitura
          </span>
        </div>

        <h1 className="newsletter-post__title">{post.title}</h1>
        <p className="newsletter-post__description">{post.description}</p>
      </div>

      <div className="newsletter-post__content">
        <article className="newsletter-post__article">
          <div className="newsletter-post__markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {getTextFromContent(post.content)}
            </ReactMarkdown>
          </div>

          {/* CTA Section */}
          <div className="newsletter-page__cta">
            <h2 className="newsletter-page__cta-title">Quer aprender mais sobre Programação?</h2>
            <p className="newsletter-page__cta-description">
              Você acabou de ganhar 1 hora com a minha equipe para uma call exclusiva! Vamos entender o seu momento e te mostrar o caminho para se tornar um programador de sucesso. Clique no botão abaixo e agende agora mesmo!
            </p>
            <a
              href="https://rodolfomori.typeform.com/to/rQb1MBt5?typeform-source=devclub.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="newsletter-page__cta-button"
            >
              Agendar minha call gratuita
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}

export default NewsletterPost
