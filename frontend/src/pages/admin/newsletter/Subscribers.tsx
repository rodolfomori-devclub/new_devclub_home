import { useState, useEffect } from 'react'
import { Search, Download, Trash2, Mail } from 'lucide-react'
import { newsletterService } from '../../../services/newsletter.service'
import { Subscriber } from '../../../types/auth.types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './Subscribers.css'

function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchSubscribers()
  }, [])

  async function fetchSubscribers() {
    try {
      const data = await newsletterService.getSubscribers()
      setSubscribers(data || [])
    } catch (error) {
      console.error('Failed to fetch subscribers:', error)
      setSubscribers([])
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja remover este inscrito?')) return

    try {
      await newsletterService.removeSubscriber(id)
      setSubscribers(subscribers.filter(s => s.id !== id))
    } catch (error) {
      console.error('Failed to delete subscriber:', error)
      alert('Erro ao remover inscrito')
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'Nome', 'Data de Inscrição']
    const rows = filteredSubscribers.map(s => [
      s.email,
      s.name || '',
      format(new Date(s.subscribedAt), 'dd/MM/yyyy HH:mm'),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `inscritos-newsletter-${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  const filteredSubscribers = subscribers.filter(
    s =>
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="subscribers">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Inscritos na Newsletter</h1>
          <p className="admin-page-subtitle">
            {subscribers.length} inscritos no total
          </p>
        </div>
        <button onClick={exportToCSV} className="admin-btn admin-btn--secondary">
          <Download size={18} />
          Exportar CSV
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por email ou nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-loading__spinner"></div>
          <p>Carregando inscritos...</p>
        </div>
      ) : filteredSubscribers.length === 0 ? (
        <div className="admin-empty">
          <Mail size={48} />
          <p>Nenhum inscrito encontrado</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Nome</th>
                <th>Data de Inscrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id}>
                  <td>
                    <div className="subscribers__email">
                      <Mail size={16} />
                      {subscriber.email}
                    </div>
                  </td>
                  <td>{subscriber.name || '-'}</td>
                  <td>
                    {format(new Date(subscriber.subscribedAt), "dd 'de' MMM, yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="admin-action-btn admin-action-btn--danger"
                        title="Remover"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Subscribers
