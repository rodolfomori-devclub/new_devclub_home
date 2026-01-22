import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { postsService } from '../../services/posts.service'
import { Post } from '../../types/post.types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './Blog.css'

function BlogList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    async function fetchPosts() {
      try {
        setError(null)
        const fetchedPosts = await postsService.getPublished('blog')
        setPosts(fetchedPosts || [])
      } catch (err: any) {
        console.error('Failed to fetch posts:', err)
        setError('Erro ao carregar posts. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchTerm(searchInput)
  }

  const filteredPosts = posts.filter(post => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      post.title.toLowerCase().includes(term) ||
      (post.description && post.description.toLowerCase().includes(term))
    )
  })

  const featuredPost = !searchTerm ? filteredPosts[0] : null
  const gridPosts = !searchTerm ? filteredPosts.slice(1) : filteredPosts

  return (
    <div className="blog-page">
      <div className="blog-page__content container">
        {/* Header */}
        <div className="blog-page__header">
          <h1 className="blog-page__title">Blog DevClub</h1>
          <p className="blog-page__subtitle">
            Artigos, tutoriais e novidades sobre programação e tecnologia
          </p>
        </div>

        {loading ? (
          <div className="blog-page__loading">
            <div className="blog-page__spinner"></div>
            <p>Carregando posts...</p>
          </div>
        ) : error ? (
          <div className="blog-page__empty">
            <p>{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="blog-page__empty">
            <p>Nenhum post publicado ainda</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Link to={`/blog/${featuredPost.slug}`} className="featured-post">
                <div className="featured-post__content">
                  <h2 className="featured-post__title">{featuredPost.title}</h2>
                  <p className="featured-post__description">{featuredPost.description}</p>
                  <div className="featured-post__footer">
                    <span className="featured-post__author">Rodolfo Mori</span>
                    <span className="featured-post__date">
                      {format(new Date(featuredPost.publishedAt || featuredPost.createdAt || new Date()), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Search Bar */}
            <form className="blog-page__search" onSubmit={handleSearch}>
              <div className="blog-page__search-wrapper">
                <Search size={18} className="blog-page__search-icon" />
                <input
                  type="text"
                  placeholder="Pesquisar artigos..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="blog-page__search-input"
                />
                <button type="submit" className="blog-page__search-btn">
                  Buscar
                </button>
              </div>
            </form>

            {/* Latest Articles */}
            <div className="blog-page__section">
              <div className="blog-page__section-header">
                <h2 className="blog-page__section-title">
                  {searchTerm ? `Resultados para "${searchTerm}"` : 'Últimos Artigos'}
                </h2>
                <div className="blog-page__section-line"></div>
              </div>

              {gridPosts.length === 0 ? (
                <div className="blog-page__empty">
                  <p>Nenhum artigo encontrado.</p>
                </div>
              ) : (
                <div className="blog-page__grid">
                  {gridPosts.map((post: any) => (
                    <Link to={`/blog/${post.slug}`} key={post._id || post.id || post.slug} className="blog-card">
                      <div className="blog-card__content">
                        <h3 className="blog-card__title">{post.title}</h3>
                        <p className="blog-card__description">{post.description}</p>
                        <div className="blog-card__footer">
                          <span className="blog-card__link">
                            Ler mais <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="blog-page__cta">
              <h2 className="blog-page__cta-title">Quer aprender mais sobre Programação?</h2>
              <p className="blog-page__cta-description">
                Você acabou de ganhar 1 hora com a minha equipe para uma call exclusiva! Vamos entender o seu momento e te mostrar o caminho para se tornar um programador de sucesso. Clique no botão abaixo e agende agora mesmo!
              </p>
              <a
                href="https://rodolfomori.typeform.com/to/rQb1MBt5?typeform-source=devclub.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="blog-page__cta-button"
              >
                Agendar minha call gratuita
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default BlogList
