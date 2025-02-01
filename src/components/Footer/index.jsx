import styled, { keyframes } from 'styled-components'
import { useLanguage } from '../../contexts/LanguageContext'

const twinkle = keyframes`
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const FooterContainer = styled.footer`
  position: relative;
  background: linear-gradient(to bottom, #0a0a2e, #1a1a4a);
  padding: 4rem 0;
  overflow: hidden;
  min-height: 300px;
  margin-top: 0;
  width: 100%;
`

const Star = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: ${twinkle} ${props => props.$duration}s ease-in-out infinite;
`

const Planet = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #48FFA7, #4ECDC4);
  right: 15%;
  top: 30%;
  box-shadow: 
    inset -10px -10px 20px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(72, 255, 167, 0.3);
  animation: ${float} 8s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    border: 2px solid rgba(72, 255, 167, 0.1);
    border-radius: 50%;
    top: -10%;
    left: -10%;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 1;
  text-align: center;
`

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;

  a {
    color: white;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
      transform: translateY(-3px);
      color: #48FFA7;
    }
  }
`

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`

function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  // Gerar 50 estrelas com posições aleatórias
  const stars = Array.from({ length: 50 }, (_, i) => (
    <Star
      key={i}
      $duration={2 + Math.random() * 3}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    />
  ))

  return (
    <FooterContainer>
      {stars}
      <Planet />
      <ContentWrapper>
        <SocialLinks>
          <a 
            href={`https://github.com/emers0n17`} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
          <a 
            href={`https://linkedin.com/in/emerson-covane-b2b3b4297`}
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a 
            href={`https://www.instagram.com/emerson_cov/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href={`mailto:emersoncovane23@gmail.com`}
            aria-label="Email"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </SocialLinks>

        <Copyright>
          © {currentYear} Emerson Covane. {t('footer.rights')}
        </Copyright>
      </ContentWrapper>
    </FooterContainer>
  )
}

export default Footer 