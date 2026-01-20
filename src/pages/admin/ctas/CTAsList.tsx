import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, ExternalLink, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ctasService } from '../../../services/ctas.service'
import { CTA, CreateCTADto } from '../../../types/cta.types'
import './CTAsList.css'

function CTAsList() {
  const [ctas, setCtas] = useState<CTA[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCta, setEditingCta] = useState<CTA | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateCTADto>()

  useEffect(() => {
    fetchCtas()
  }, [])

  async function fetchCtas() {
    try {
      const ctas = await ctasService.getAll()
      setCtas(ctas)
    } catch (error) {
      console.error('Failed to fetch CTAs:', error)
    } finally {
      setLoading(false)
    }
  }

  const openCreateModal = () => {
    setEditingCta(null)
    reset({
      title: '',
      description: '',
      image: '',
      videoUrl: '',
      buttonText: '',
      redirectUrl: '',
    })
    setShowModal(true)
  }

  const openEditModal = (cta: CTA) => {
    setEditingCta(cta)
    reset({
      title: cta.title,
      description: cta.description || '',
      image: cta.image || '',
      videoUrl: cta.videoUrl || '',
      buttonText: cta.buttonText || '',
      redirectUrl: cta.redirectUrl,
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingCta(null)
    reset()
  }

  const onSubmit = async (data: CreateCTADto) => {
    try {
      if (editingCta) {
        await ctasService.update(editingCta.id, data)
      } else {
        await ctasService.create(data)
      }
      fetchCtas()
      closeModal()
    } catch (error) {
      console.error('Failed to save CTA:', error)
      alert('Erro ao salvar CTA')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este CTA?')) return

    try {
      await ctasService.delete(id)
      setCtas(ctas.filter(c => c.id !== id))
    } catch (error) {
      console.error('Failed to delete CTA:', error)
      alert('Erro ao excluir CTA')
    }
  }

  return (
    <div className="ctas-list">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">CTAs</h1>
          <p className="admin-page-subtitle">Gerencie os Call-to-Actions do site</p>
        </div>
        <button onClick={openCreateModal} className="admin-btn admin-btn--primary">
          <Plus size={18} />
          Novo CTA
        </button>
      </div>

      {loading ? (
        <div className="admin-loading">
          <div className="admin-loading__spinner"></div>
          <p>Carregando CTAs...</p>
        </div>
      ) : ctas.length === 0 ? (
        <div className="admin-empty">
          <p>Nenhum CTA cadastrado</p>
          <button onClick={openCreateModal} className="admin-btn admin-btn--primary">
            Criar primeiro CTA
          </button>
        </div>
      ) : (
        <div className="ctas-list__grid">
          {ctas.map((cta) => (
            <div key={cta.id} className="cta-card">
              {cta.image && (
                <div className="cta-card__image">
                  <img src={cta.image} alt={cta.title} />
                </div>
              )}
              <div className="cta-card__content">
                <h3 className="cta-card__title">{cta.title}</h3>
                {cta.description && (
                  <p className="cta-card__description">{cta.description}</p>
                )}
                <div className="cta-card__link">
                  <ExternalLink size={14} />
                  <a href={cta.redirectUrl} target="_blank" rel="noopener noreferrer">
                    {cta.redirectUrl}
                  </a>
                </div>
                {cta.buttonText && (
                  <span className="cta-card__button-preview">
                    Botão: "{cta.buttonText}"
                  </span>
                )}
              </div>
              <div className="cta-card__actions">
                <button
                  onClick={() => openEditModal(cta)}
                  className="admin-action-btn"
                  title="Editar"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(cta.id)}
                  className="admin-action-btn admin-action-btn--danger"
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2>{editingCta ? 'Editar CTA' : 'Novo CTA'}</h2>
              <button onClick={closeModal} className="admin-modal__close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="admin-modal__form">
              <div className="admin-form-group">
                <label className="admin-label">Título *</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Título do CTA"
                  {...register('title', { required: 'Título é obrigatório' })}
                />
                {errors.title && <span className="admin-error">{errors.title.message}</span>}
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Descrição</label>
                <textarea
                  className="admin-textarea"
                  placeholder="Descrição opcional"
                  rows={2}
                  {...register('description')}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">URL de Redirecionamento *</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://exemplo.com/pagina"
                  {...register('redirectUrl', { required: 'URL é obrigatória' })}
                />
                {errors.redirectUrl && <span className="admin-error">{errors.redirectUrl.message}</span>}
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Texto do Botão</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Ex: Saiba mais"
                  {...register('buttonText')}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">URL da Imagem</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://exemplo.com/imagem.jpg"
                  {...register('image')}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">URL do Vídeo</label>
                <input
                  type="url"
                  className="admin-input"
                  placeholder="https://youtube.com/embed/..."
                  {...register('videoUrl')}
                />
              </div>

              <div className="admin-modal__actions">
                <button type="button" onClick={closeModal} className="admin-btn admin-btn--secondary">
                  Cancelar
                </button>
                <button type="submit" className="admin-btn admin-btn--primary">
                  {editingCta ? 'Salvar Alterações' : 'Criar CTA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CTAsList
