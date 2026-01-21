import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, FileText, Sparkles, HelpCircle, Save, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { postsService } from '../../../services/posts.service'
import { PostCategory, CreatePostDto } from '../../../types/post.types'
import './PostCreate.css'

type CreationType = 'manual' | 'topic' | 'faq'

interface StepOneData {
  category: PostCategory
  creationType: CreationType
}

interface StepTwoData {
  title: string
  description: string
  content: string
  topic?: string
  faqs?: string[]
}

const FAQ_OPTIONS = [
  'O que é o DevClub?',
  'Preciso ter conhecimento prévio em programação?',
  'Quanto tempo leva para aprender a programar?',
  'Qual a diferença entre as formações?',
  'Como funciona o suporte?',
  'Posso cancelar a qualquer momento?',
  'Tem certificado?',
  'Consigo emprego após o curso?',
]

function PostCreate() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [stepOneData, setStepOneData] = useState<StepOneData>({
    category: 'blog',
    creationType: 'manual',
  })
  const [stepTwoData, setStepTwoData] = useState<StepTwoData>({
    title: '',
    description: '',
    content: '',
    topic: '',
    faqs: [],
  })
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<StepTwoData>()

  // Step 1: Select category and type
  const handleStepOne = (category: PostCategory, creationType: CreationType) => {
    setStepOneData({ category, creationType })
    setStep(2)
  }

  // Step 2: Content input or AI generation
  const handleStepTwo = async (data: StepTwoData) => {
    if (stepOneData.creationType === 'manual') {
      setStepTwoData(data)
      setStep(3)
    } else if (stepOneData.creationType === 'topic') {
      await generateFromTopic(data.topic || '')
    } else if (stepOneData.creationType === 'faq') {
      await generateFromFaq(stepTwoData.faqs || [])
    }
  }

  const generateFromTopic = async (topic: string) => {
    if (!topic.trim()) {
      alert('Por favor, insira um tema')
      return
    }

    setGenerating(true)
    try {
      const post = await postsService.generateFromTopic({
        topic,
        category: stepOneData.category,
      })
      setStepTwoData({
        title: post.title,
        description: post.description,
        content: post.content,
      })
      setValue('title', post.title)
      setValue('description', post.description)
      setValue('content', post.content)
      setStep(3)
    } catch (error) {
      console.error('Failed to generate post:', error)
      alert('Erro ao gerar post com IA')
    } finally {
      setGenerating(false)
    }
  }

  const generateFromFaq = async (faqs: string[]) => {
    if (!faqs.length) {
      alert('Por favor, selecione pelo menos uma pergunta')
      return
    }

    setGenerating(true)
    try {
      const post = await postsService.generateFromFaq({
        questions: faqs,
        category: stepOneData.category,
      })
      setStepTwoData({
        title: post.title,
        description: post.description,
        content: post.content,
      })
      setValue('title', post.title)
      setValue('description', post.description)
      setValue('content', post.content)
      setStep(3)
    } catch (error) {
      console.error('Failed to generate post:', error)
      alert('Erro ao gerar post com IA')
    } finally {
      setGenerating(false)
    }
  }

  const toggleFaq = (faq: string) => {
    const current = stepTwoData.faqs || []
    const updated = current.includes(faq)
      ? current.filter(f => f !== faq)
      : [...current, faq]
    setStepTwoData({ ...stepTwoData, faqs: updated })
  }

  // Step 3: Review and save
  const handleSave = async (publish: boolean = false) => {
    setLoading(true)
    try {
      const postData: CreatePostDto = {
        title: stepTwoData.title,
        description: stepTwoData.description,
        content: stepTwoData.content,
        category: stepOneData.category,
      }

      const post = await postsService.create(postData)

      if (publish) {
        await postsService.publish(post.id)
      }

      navigate('/admin/posts')
    } catch (error) {
      console.error('Failed to save post:', error)
      alert('Erro ao salvar post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="post-create">
      <div className="admin-page-header">
        <button onClick={() => navigate('/admin/posts')} className="admin-btn admin-btn--ghost">
          <ArrowLeft size={18} />
          Voltar
        </button>
      </div>

      {/* Progress indicator */}
      <div className="post-create__progress">
        <div className={`post-create__step ${step >= 1 ? 'post-create__step--active' : ''}`}>
          <span className="post-create__step-number">1</span>
          <span className="post-create__step-label">Tipo</span>
        </div>
        <div className="post-create__step-line"></div>
        <div className={`post-create__step ${step >= 2 ? 'post-create__step--active' : ''}`}>
          <span className="post-create__step-number">2</span>
          <span className="post-create__step-label">Conteúdo</span>
        </div>
        <div className="post-create__step-line"></div>
        <div className={`post-create__step ${step >= 3 ? 'post-create__step--active' : ''}`}>
          <span className="post-create__step-number">3</span>
          <span className="post-create__step-label">Revisão</span>
        </div>
      </div>

      {/* Step 1: Select Type */}
      {step === 1 && (
        <div className="post-create__content">
          <h2 className="post-create__title">Selecione o tipo de post</h2>

          <div className="post-create__category-select">
            <h3 className="post-create__subtitle">Categoria</h3>
            <div className="post-create__options">
              <button
                className={`post-create__option ${stepOneData.category === 'blog' ? 'post-create__option--selected' : ''}`}
                onClick={() => setStepOneData({ ...stepOneData, category: 'blog' })}
              >
                <FileText size={24} />
                <span>Blog</span>
              </button>
              <button
                className={`post-create__option ${stepOneData.category === 'newsletter' ? 'post-create__option--selected' : ''}`}
                onClick={() => setStepOneData({ ...stepOneData, category: 'newsletter' })}
              >
                <FileText size={24} />
                <span>Newsletter</span>
              </button>
            </div>
          </div>

          <div className="post-create__type-select">
            <h3 className="post-create__subtitle">Como deseja criar?</h3>
            <div className="post-create__type-cards">
              <div
                className="post-create__type-card"
                onClick={() => handleStepOne(stepOneData.category, 'manual')}
              >
                <div className="post-create__type-icon">
                  <FileText size={32} />
                </div>
                <h4>Manual</h4>
                <p>Escreva o conteúdo manualmente</p>
              </div>

              <div
                className="post-create__type-card post-create__type-card--ai"
                onClick={() => handleStepOne(stepOneData.category, 'topic')}
              >
                <div className="post-create__type-icon post-create__type-icon--ai">
                  <Sparkles size={32} />
                </div>
                <h4>Por Tema</h4>
                <p>IA gera conteúdo a partir de um tema</p>
                <span className="post-create__ai-badge">IA</span>
              </div>

              <div
                className="post-create__type-card post-create__type-card--ai"
                onClick={() => handleStepOne(stepOneData.category, 'faq')}
              >
                <div className="post-create__type-icon post-create__type-icon--ai">
                  <HelpCircle size={32} />
                </div>
                <h4>Por Dúvidas</h4>
                <p>IA gera conteúdo baseado em FAQs</p>
                <span className="post-create__ai-badge">IA</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Content */}
      {step === 2 && (
        <div className="post-create__content">
          <button onClick={() => setStep(1)} className="admin-btn admin-btn--ghost post-create__back">
            <ArrowLeft size={16} />
            Voltar
          </button>

          {stepOneData.creationType === 'manual' && (
            <form onSubmit={handleSubmit(handleStepTwo)} className="post-create__form">
              <h2 className="post-create__title">Escreva seu post</h2>

              <div className="admin-form-group">
                <label className="admin-label">Título</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Título do post"
                  {...register('title', { required: 'Título é obrigatório' })}
                />
                {errors.title && <span className="admin-error">{errors.title.message}</span>}
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Descrição</label>
                <textarea
                  className="admin-textarea"
                  placeholder="Breve descrição do post"
                  rows={2}
                  {...register('description', { required: 'Descrição é obrigatória' })}
                />
                {errors.description && <span className="admin-error">{errors.description.message}</span>}
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Conteúdo (Markdown)</label>
                <textarea
                  className="admin-textarea admin-textarea--large"
                  placeholder="Escreva o conteúdo em Markdown..."
                  rows={15}
                  {...register('content', { required: 'Conteúdo é obrigatório' })}
                />
                {errors.content && <span className="admin-error">{errors.content.message}</span>}
              </div>

              <button type="submit" className="admin-btn admin-btn--primary">
                Continuar
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          {stepOneData.creationType === 'topic' && (
            <div className="post-create__ai-form">
              <h2 className="post-create__title">
                <Sparkles size={24} />
                Gerar post por tema
              </h2>
              <p className="post-create__description">
                Digite um tema e a IA irá gerar o conteúdo automaticamente.
              </p>

              <div className="admin-form-group">
                <label className="admin-label">Tema do post</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Ex: Como começar na programação em 2024"
                  value={stepTwoData.topic}
                  onChange={(e) => setStepTwoData({ ...stepTwoData, topic: e.target.value })}
                />
              </div>

              <button
                onClick={() => generateFromTopic(stepTwoData.topic || '')}
                className="admin-btn admin-btn--primary"
                disabled={generating}
              >
                {generating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Gerar com IA
                  </>
                )}
              </button>
            </div>
          )}

          {stepOneData.creationType === 'faq' && (
            <div className="post-create__ai-form">
              <h2 className="post-create__title">
                <HelpCircle size={24} />
                Gerar post por dúvidas
              </h2>
              <p className="post-create__description">
                Selecione as perguntas frequentes e a IA irá criar um post respondendo-as.
              </p>

              <div className="post-create__faq-list">
                {FAQ_OPTIONS.map((faq) => (
                  <label key={faq} className="post-create__faq-item">
                    <input
                      type="checkbox"
                      checked={stepTwoData.faqs?.includes(faq)}
                      onChange={() => toggleFaq(faq)}
                    />
                    <span>{faq}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => generateFromFaq(stepTwoData.faqs || [])}
                className="admin-btn admin-btn--primary"
                disabled={generating || !stepTwoData.faqs?.length}
              >
                {generating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Gerar com IA
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="post-create__content">
          <button onClick={() => setStep(2)} className="admin-btn admin-btn--ghost post-create__back">
            <ArrowLeft size={16} />
            Voltar para edição
          </button>

          <h2 className="post-create__title">Revisão do post</h2>

          <div className="post-create__review">
            <div className="post-create__review-header">
              <span className="admin-badge">
                {stepOneData.category === 'blog' ? 'Blog' : 'Newsletter'}
              </span>
            </div>

            <div className="post-create__review-content">
              <h3 className="post-create__review-title">{stepTwoData.title}</h3>
              <p className="post-create__review-description">{stepTwoData.description}</p>

              <div className="post-create__preview">
                <h4>Preview do conteúdo:</h4>
                <div className="post-create__markdown-preview">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {stepTwoData.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            <div className="post-create__actions">
              <button
                onClick={() => handleSave(false)}
                className="admin-btn admin-btn--secondary"
                disabled={loading}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                Salvar Rascunho
              </button>
              <button
                onClick={() => handleSave(true)}
                className="admin-btn admin-btn--primary"
                disabled={loading}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                Publicar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostCreate
