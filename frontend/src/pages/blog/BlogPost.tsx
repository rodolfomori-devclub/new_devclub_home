import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { postsService } from '../../services/posts.service'
import { Post } from '../../types/post.types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './Blog.css'

function BlogPost() {
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

  // Convert Sanity Portable Text to plain text for word count
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
      <div className="blog-post">
        <div className="blog-page__loading">
          <div className="blog-page__spinner"></div>
          <p>Carregando post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="blog-post">
        <div className="blog-post__not-found container">
          <h2>Post não encontrado</h2>
          <p>O post que você está procurando não existe ou foi removido.</p>
          <Link to="/blog" className="btn btn--primary">
            Voltar ao Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-post">
      <div className="blog-post__header">
        <div className="blog-post__header-bg">
          <div className="blog-post__header-glow blog-post__header-glow--purple"></div>
        </div>
        <div className="container">
          <Link to="/blog" className="blog-post__back">
            <ArrowLeft size={18} />
            Voltar ao Blog
          </Link>

          <div className="blog-post__meta">
            <span className="blog-post__date">
              <Calendar size={16} />
              {format(new Date(post.publishedAt || post.createdAt || new Date()), "dd 'de' MMMM, yyyy", {
                locale: ptBR,
              })}
            </span>
            <span className="blog-post__read-time">
              <Clock size={16} />
              {estimateReadTime(post.content)} min de leitura
            </span>
          </div>

          <h1 className="blog-post__title">{post.title}</h1>
          <p className="blog-post__description">{post.description}</p>
        </div>
      </div>

      <div className="blog-post__content container">
        <article className="blog-post__article">
          <div className="blog-post__markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {getTextFromContent(post.content)}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPost
