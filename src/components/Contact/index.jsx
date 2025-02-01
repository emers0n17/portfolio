import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styled from 'styled-components'
import { Toast } from '../shared/Toast'
import { SectionTitle } from '../shared/SectionTitle'
import { useLanguage } from '../../contexts/LanguageContext'

// Configuração inicial do EmailJS (substitua com suas credenciais)
const EMAILJS_CONFIG = {
  serviceId: 'service_7bnsnre',
  templateId: 'template_2rtmoxf',
  publicKey: '_OalXyyj1XauVN6KC'
}

const ContactSection = styled.section`
  padding: 5rem 1rem;
  background: var(--bg-secondary);

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 0 1rem;
  }
`

const FormContainer = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-primary);
  border-radius: 12px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`

const Label = styled.label`
  position: absolute;
  left: 12px;
  top: ${props => props.$hasValue ? '-12px' : '12px'};
  background: var(--bg-primary);
  padding: 0 8px;
  font-size: ${props => props.$hasValue ? '0.8rem' : '1rem'};
  color: var(--text-secondary);
  transition: all 0.3s ease;
  pointer-events: none;

  @media (max-width: 768px) {
    font-size: ${props => props.$hasValue ? '0.7rem' : '0.9rem'};
  }
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  padding-top: 1.2rem;
  border: 2px solid ${props => props.$hasError ? '#ff4444' : 'var(--border-color)'};
  border-radius: 12px;
  font-size: 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.8rem;
    padding-top: 1rem;
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
    border-color: #ff0066;
    box-shadow: 0 0 15px rgba(255, 0, 102, 0.1);
  }

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: -12px;
    font-size: 0.8rem;
    color: #ff0066;
    background: var(--bg-primary);
    padding: 0 8px;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 1.2rem 1rem;
  border: 2px solid ${props => props.$hasError ? '#ff4444' : 'var(--border-color)'};
  border-radius: 12px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 100px;
    font-size: 0.9rem;
  }

  &:focus {
    outline: none;
    border-color: #ff0066;
    box-shadow: 0 0 15px rgba(255, 0, 102, 0.1);
  }

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: -12px;
    font-size: 0.8rem;
    color: #ff0066;
    background: var(--bg-primary);
    padding: 0 8px;
  }
`

const ErrorMessage = styled.span`
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #ff0066, #6e0dd0);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 0, 102, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  i {
    font-size: 1.1rem;
  }
`

const SuccessMessage = styled.div`
  color: #28a745;
  background: #d4edda;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid #c3e6cb;
`

const ErrorAlert = styled(SuccessMessage)`
  color: #dc3545;
  background: #f8d7da;
  border-color: #f5c6cb;
`

function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '', isClosing: false })

  const validateForm = () => {
    let isValid = true
    const newErrors = { name: '', email: '', message: '' }

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = 'Por favor, insira seu nome'
      isValid = false
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Por favor, insira seu email'
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor, insira um email válido'
      isValid = false
    }

    // Validação da mensagem
    if (!formData.message.trim()) {
      newErrors.message = 'Por favor, insira uma mensagem'
      isValid = false
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'A mensagem deve ter pelo menos 10 caracteres'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const showToast = (message, type) => {
    setToast({ show: true, message, type, isClosing: false })
    
    // Inicia a animação de saída após 4.5s
    setTimeout(() => {
      setToast(prev => ({ ...prev, isClosing: true }))
    }, 4500)
    
    // Remove o toast após a animação de saída
    setTimeout(() => {
      setToast({ show: false, message: '', type: '', isClosing: false })
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        e.target,
        EMAILJS_CONFIG.publicKey
      )

      showToast('Mensagem enviada com sucesso!', 'success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      showToast('Erro ao enviar mensagem. Tente novamente.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpa erros quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <ContactSection id="contact">
      <SectionTitle>
        <h2>
          <i className="fas fa-envelope"></i>
          {t('contact.title')}
        </h2>
        <p>{t('contact.description')}</p>
      </SectionTitle>

      <ContactContainer>
        <FormContainer onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              name="name"
              placeholder=" "
              value={formData.name}
              onChange={handleChange}
              $hasError={!!errors.name}
            />
            <Label $hasValue={!!formData.name}>{t('contact.name')}</Label>
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <Input
              type="email"
              name="email"
              placeholder=" "
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
            />
            <Label $hasValue={!!formData.email}>{t('contact.email')}</Label>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputWrapper>

          <InputWrapper>
            <TextArea
              name="message"
              placeholder=" "
              value={formData.message}
              onChange={handleChange}
              $hasError={!!errors.message}
            />
            <Label $hasValue={!!formData.message}>{t('contact.message')}</Label>
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </InputWrapper>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? (
              <i className="fas fa-spinner fa-spin" />
            ) : (
              <>
                <i className="fas fa-paper-plane" />
                {t('contact.send')}
              </>
            )}
          </SubmitButton>
        </FormContainer>
      </ContactContainer>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          isClosing={toast.isClosing}
        />
      )}
    </ContactSection>
  )
}

export default ContactForm