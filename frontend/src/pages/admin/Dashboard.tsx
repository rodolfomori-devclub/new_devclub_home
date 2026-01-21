import { useState, useEffect } from 'react'
import { FileText, Megaphone, Users, TrendingUp } from 'lucide-react'
import { postsService } from '../../services/posts.service'
import { ctasService } from '../../services/ctas.service'
import { newsletterService } from '../../services/newsletter.service'
import './Dashboard.css'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalCtas: number
  totalSubscribers: number
}

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalCtas: 0,
    totalSubscribers: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [posts, ctas, subscribers] = await Promise.all([
          postsService.getAll(),
          ctasService.getAll(),
          newsletterService.getSubscribers(),
        ])

        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p: any) => p.status === 'published').length,
          draftPosts: posts.filter((p: any) => p.status === 'draft').length,
          totalCtas: ctas.length,
          totalSubscribers: subscribers.length,
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner"></div>
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">Visão geral do sistema</p>
      </div>

      <div className="dashboard__stats">
        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--purple">
            <FileText size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{stats.totalPosts}</span>
            <span className="stat-card__label">Total de Posts</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--green">
            <TrendingUp size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{stats.publishedPosts}</span>
            <span className="stat-card__label">Posts Publicados</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--yellow">
            <Megaphone size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{stats.totalCtas}</span>
            <span className="stat-card__label">CTAs Ativos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon stat-card__icon--blue">
            <Users size={24} />
          </div>
          <div className="stat-card__content">
            <span className="stat-card__value">{stats.totalSubscribers}</span>
            <span className="stat-card__label">Inscritos Newsletter</span>
          </div>
        </div>
      </div>

      <div className="dashboard__grid">
        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Posts por Status</h3>
          <div className="dashboard__chart-placeholder">
            <div className="dashboard__status-bar">
              <div className="dashboard__status-item">
                <span className="admin-badge admin-badge--success">Publicados</span>
                <span className="dashboard__status-value">{stats.publishedPosts}</span>
              </div>
              <div className="dashboard__status-item">
                <span className="admin-badge admin-badge--warning">Rascunhos</span>
                <span className="dashboard__status-value">{stats.draftPosts}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Ações Rápidas</h3>
          <div className="dashboard__actions">
            <a href="/admin/posts/create" className="dashboard__action-btn">
              <FileText size={18} />
              Novo Post
            </a>
            <a href="/admin/ctas" className="dashboard__action-btn">
              <Megaphone size={18} />
              Gerenciar CTAs
            </a>
            <a href="/admin/newsletter" className="dashboard__action-btn">
              <Users size={18} />
              Ver Inscritos
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
