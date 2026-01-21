import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Mail } from 'lucide-react'
import { postsService } from '../../services/posts.service'
import { Post } from '../../types/post.types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './Newsletter.css'

function NewsletterList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await postsService.getPublished('newsletter')
        setPosts(posts)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const estimateReadTime = (content: any) => {
    if (!content) return 1
    const wordsPerMinute = 200

    let text = ''
    if (typeof content === 'string') {
      text = content
    } else if (Array.isArray(content)) {
      // Handle Sanity Portable Text format
      text = content.map((block: any) => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child: any) => child.text || '').join('')
        }
        if (block._type === 'code' && block.code) {
          return block.code
        }
        return ''
      }).join(' ')
    }

    const words = text.split(/\s+/).filter(w => w.length > 0).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
  }

  return (
    <div className="newsletter-page">
      <div className="newsletter-page__hero">
        <span className="tag">Newsletter</span>
        <h1 className="newsletter-page__title">
          Fique por dentro das <span className="text-purple">novidades</span>
        </h1>
        <p className="newsletter-page__subtitle">
          Receba conteúdos exclusivos sobre programação e carreira diretamente no seu email
        </p>

        <div className="newsletter-page__subscribe">
          <Mail size={18} />
          <span>Inscreva-se para receber as edições em primeira mão</span>
        </div>
      </div>

      <div className="newsletter-page__content">
        {loading ? (
          <div className="newsletter-page__loading">
            <div className="newsletter-page__spinner"></div>
            <p>Carregando edições...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="newsletter-page__empty">
            <p>Nenhuma edição publicada ainda</p>
          </div>
        ) : (
          <div className="newsletter-page__list">
            {posts.map((post: any, index) => (
              <Link to={`/newsletter/${post.slug}`} key={post._id || post.id || post.slug} className="newsletter-card">
                <div className="newsletter-card__number">
                  #{index + 1}
                </div>
                <div className="newsletter-card__content">
                  <div className="newsletter-card__meta">
                    <span className="newsletter-card__date">
                      <Calendar size={14} />
                      {format(new Date(post.publishedAt || post.createdAt || new Date()), "dd 'de' MMM, yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                    <span className="newsletter-card__read-time">
                      <Clock size={14} />
                      {estimateReadTime(post.content)} min de leitura
                    </span>
                  </div>
                  <h2 className="newsletter-card__title">{post.title}</h2>
                  <p className="newsletter-card__description">{post.description}</p>
                </div>
                <div className="newsletter-card__arrow">
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsletterList
