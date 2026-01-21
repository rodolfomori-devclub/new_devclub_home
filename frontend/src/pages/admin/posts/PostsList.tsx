import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Send, Eye, Search, RefreshCw, Upload } from 'lucide-react'
import { postsService } from '../../../services/posts.service'
import { Post, PostCategory, PostStatus } from '../../../types/post.types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './PostsList.css'

interface PostsListProps {
  category?: PostCategory
  excludeCategory?: PostCategory
}

function PostsList({ category, excludeCategory }: PostsListProps = {}) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'draft' | 'published'>('draft')
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [publishingPosts, setPublishingPosts] = useState<string[]>([])
  const [deletingPosts, setDeletingPosts] = useState<string[]>([])

  useEffect(() => {
    fetchPosts()
    setSelectedPosts([])
    setSearchTerm('')
  }, [activeTab, category])

  async function fetchPosts() {
    try {
      setLoading(true)
      const allPosts = await postsService.getAll(category, activeTab as PostStatus)
      // Client-side filtering if excludeCategory is set
      const filteredByCategory = excludeCategory
        ? allPosts.filter(p => p.category !== excludeCategory)
        : allPosts
      setPosts(filteredByCategory)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle individual post selection
  const handlePostSelect = (postId: string) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  // Handle select all
  const handleSelectAll = () => {
    const allSelected = filteredPosts.length > 0 && filteredPosts.every(post => selectedPosts.includes(post.id))
    if (allSelected) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id))
    }
  }

  // Publish selected posts
  const handlePublishSelected = async () => {
    if (selectedPosts.length === 0) return

    setPublishingPosts(selectedPosts)

    try {
      let successCount = 0
      for (const postId of selectedPosts) {
        try {
          await postsService.publish(postId)
          successCount++
        } catch (error) {
          console.error(`Error publishing post ${postId}:`, error)
        }
      }

      alert(`${successCount} posts publicados com sucesso`)
      setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)))
      setSelectedPosts([])
    } catch (error) {
      console.error('Error publishing posts:', error)
      alert('Falha ao publicar posts')
    } finally {
      setPublishingPosts([])
    }
  }

  // Publish all draft posts
  const handlePublishAll = async () => {
    const draftPostIds = filteredPosts.map(post => post.id)

    if (draftPostIds.length === 0) {
      alert('Nenhum post em rascunho para publicar')
      return
    }

    if (!confirm(`Publicar ${draftPostIds.length} post(s)?`)) return

    setPublishingPosts(draftPostIds)

    try {
      let successCount = 0
      for (const postId of draftPostIds) {
        try {
          await postsService.publish(postId)
          successCount++
        } catch (error) {
          console.error(`Error publishing post ${postId}:`, error)
        }
      }

      alert(`${successCount} posts publicados com sucesso`)
      setPosts([])
      setSelectedPosts([])
    } catch (error) {
      console.error('Error publishing all posts:', error)
      alert('Falha ao publicar todos os posts')
    } finally {
      setPublishingPosts([])
    }
  }

  // Delete selected posts
  const handleDeleteSelected = async () => {
    if (selectedPosts.length === 0) return

    if (!confirm(`Tem certeza que deseja deletar ${selectedPosts.length} post(s)?`)) return

    setDeletingPosts(selectedPosts)

    try {
      let successCount = 0
      for (const postId of selectedPosts) {
        try {
          await postsService.delete(postId)
          successCount++
        } catch (error) {
          console.error(`Error deleting post ${postId}:`, error)
        }
      }

      alert(`${successCount} posts deletados com sucesso`)
      setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)))
      setSelectedPosts([])
    } catch (error) {
      console.error('Error deleting posts:', error)
      alert('Falha ao deletar posts')
    } finally {
      setDeletingPosts([])
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este post?')) return

    setDeletingPosts([id])
    try {
      await postsService.delete(id)
      setPosts(posts.filter(p => p.id !== id))
    } catch (error) {
      console.error('Failed to delete post:', error)
      alert('Erro ao excluir post')
    } finally {
      setDeletingPosts([])
    }
  }

  async function handlePublish(id: string) {
    setPublishingPosts([id])
    try {
      await postsService.publish(id)
      setPosts(posts.filter(p => p.id !== id))
      alert('Post publicado com sucesso')
    } catch (error) {
      console.error('Failed to publish post:', error)
      alert('Erro ao publicar post')
    } finally {
      setPublishingPosts([])
    }
  }

  const filteredPosts = posts
    .filter(post => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        return post.title.toLowerCase().includes(term) ||
          (post.description && post.description.toLowerCase().includes(term))
      }
      return true
    })
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt).getTime()
      const dateB = new Date(b.publishedAt || b.createdAt).getTime()
      return dateB - dateA
    })

  const allSelected = filteredPosts.length > 0 && filteredPosts.every(post => selectedPosts.includes(post.id))

  const getStatusBadge = (status: PostStatus) => {
    const badges: Record<PostStatus, { class: string; label: string }> = {
      draft: { class: 'admin-badge--warning', label: 'Rascunho' },
      published: { class: 'admin-badge--success', label: 'Publicado' },
      generate: { class: 'admin-badge--info', label: 'Gerando...' },
      failed: { class: 'admin-badge--danger', label: 'Falhou' },
    }
    return badges[status]
  }

  const getCategoryBadge = (cat: PostCategory) => {
    return cat === 'blog' ? 'Blog' : 'Newsletter'
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const pageTitle = category === 'newsletter' ? 'Gerenciar Newsletter' : 'Gerenciar Posts'
  const pageSubtitle = category === 'newsletter' ? 'Gerencie suas newsletters' : 'Gerencie todos os seus posts'

  return (
    <div className="posts-list">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">{pageTitle}</h1>
          <p className="admin-page-subtitle">{pageSubtitle}</p>
        </div>
        <div className="admin-page-header__actions">
          <button
            onClick={fetchPosts}
            className="admin-btn admin-btn--secondary"
            disabled={loading}
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Atualizar
          </button>
          <Link to="/admin/posts/create" className="admin-btn admin-btn--primary">
            <Plus size={18} />
            Novo Post
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'draft' ? 'admin-tab--active' : ''}`}
          onClick={() => setActiveTab('draft')}
        >
          Rascunhos
        </button>
        <button
          className={`admin-tab ${activeTab === 'published' ? 'admin-tab--active' : ''}`}
          onClick={() => setActiveTab('published')}
        >
          Publicados
        </button>
      </div>

      {/* Search */}
      <div className="admin-filters">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input"
          />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="admin-bulk-actions">
          <span className="admin-bulk-actions__count">
            {selectedPosts.length} post(s) selecionado(s)
          </span>
          <div className="admin-bulk-actions__buttons">
            {activeTab === 'draft' && (
              <button
                onClick={handlePublishSelected}
                className="admin-btn admin-btn--primary admin-btn--sm"
                disabled={publishingPosts.length > 0}
              >
                <Upload size={16} />
                Publicar Selecionados
              </button>
            )}
            <button
              onClick={handleDeleteSelected}
              className="admin-btn admin-btn--danger admin-btn--sm"
              disabled={deletingPosts.length > 0}
            >
              <Trash2 size={16} />
              Deletar Selecionados
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions - Publish All */}
      {activeTab === 'draft' && filteredPosts.length > 0 && (
        <div className="admin-quick-actions">
          <span className="admin-quick-actions__count">
            {filteredPosts.length} post(s) em rascunho
          </span>
          <button
            onClick={handlePublishAll}
            className="admin-btn admin-btn--secondary admin-btn--sm"
            disabled={publishingPosts.length > 0}
          >
            <Upload size={16} />
            Publicar Todos
          </button>
        </div>
      )}

      {loading ? (
        <div className="admin-loading">
          <div className="admin-loading__spinner"></div>
          <p>Carregando posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="admin-empty">
          <p>{searchTerm ? 'Nenhum post encontrado com este filtro' : 'Nenhum post encontrado'}</p>
          {activeTab === 'draft' && !searchTerm && (
            <Link to="/admin/posts/create" className="admin-btn admin-btn--primary">
              Criar primeiro post
            </Link>
          )}
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="admin-table__checkbox-col">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="admin-checkbox"
                  />
                </th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Status</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => {
                const statusBadge = getStatusBadge(post.status)
                const isPublishing = publishingPosts.includes(post.id)
                const isDeleting = deletingPosts.includes(post.id)
                return (
                  <tr key={post.id} className={selectedPosts.includes(post.id) ? 'admin-table__row--selected' : ''}>
                    <td className="admin-table__checkbox-col">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handlePostSelect(post.id)}
                        className="admin-checkbox"
                      />
                    </td>
                    <td>
                      <span className="posts-list__title">{truncateText(post.title, 60)}</span>
                    </td>
                    <td>
                      <span className="posts-list__description">
                        {truncateText(post.description || 'Sem descrição', 80)}
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge">
                        {getCategoryBadge(post.category)}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${statusBadge.class}`}>
                        {statusBadge.label}
                      </span>
                    </td>
                    <td>
                      {post.publishedAt
                        ? format(new Date(post.publishedAt), "dd/MM/yyyy", { locale: ptBR })
                        : post.createdAt
                          ? format(new Date(post.createdAt), "dd/MM/yyyy", { locale: ptBR })
                          : 'N/A'}
                    </td>
                    <td>
                      <div className="admin-actions">
                        {post.status === 'published' && post.slug && (
                          <a
                            href={`/${post.category}/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="admin-action-btn"
                            title="Visualizar"
                          >
                            <Eye size={16} />
                          </a>
                        )}
                        <Link
                          to={`/admin/posts/edit/${post.id}`}
                          className="admin-action-btn"
                          title="Editar"
                        >
                          <Edit size={16} />
                        </Link>
                        {post.status === 'draft' && (
                          <button
                            onClick={() => handlePublish(post.id)}
                            className="admin-action-btn admin-action-btn--success"
                            title="Publicar"
                            disabled={isPublishing}
                          >
                            <Send size={16} className={isPublishing ? 'animate-spin' : ''} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="admin-action-btn admin-action-btn--danger"
                          title="Excluir"
                          disabled={isDeleting}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default PostsList
