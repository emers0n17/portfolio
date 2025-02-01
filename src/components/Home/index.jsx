import { useEffect, useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import styled from 'styled-components'
import './styles.css'
import profileImage from '../../assets/perfil.svg'
import flagSvg from '../../assets/flag.svg'

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
`


const SkillsWrapper = styled.div`
  display: flex;
  overflow: hidden;
  padding: 2rem 0;
  width: 100%;
  background: var(--bg-secondary);
  position: relative;
  pointer-events: none;
  user-select: none;
`

const SkillsTrack = styled.div`
  display: flex;
  gap: 2rem;
  animation: scroll 30s linear infinite;
  width: fit-content;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-50%));
    }
  }

  .skill-icon {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    i {
      font-size: 1.8rem;
      color: ${props => props.color || 'var(--text-primary)'};
    }
  }
`

const skills = [
  { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26' },
  { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6' },
  { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E' },
  { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
  { name: 'PHP', icon: 'fab fa-php', color: '#777BB4' },
  { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1' },
  { name: 'Java', icon: 'fab fa-java', color: '#007396' },
  { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
  { name: 'C++', icon: 'fab fa-cuttlefish', color: '#00599C' },
  { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
  { name: 'Appwrite', icon: 'fas fa-server', color: '#F02E65' },
  { name: 'Firebase', icon: 'fas fa-fire', color: '#FFCA28' }
]

function Home() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="home-section">
      <div className={`hero ${isVisible ? 'visible' : ''}`}>
        <div className="main-content">
          <div className="profile-container">
            <div className="profile-image">
              <img src={profileImage} alt={t('home.name')} />
            </div>
          </div>

          <div className="info-container">
            <NameWrapper>
              <h1 className="name">{t('home.name')}</h1>
            </NameWrapper>
            <h2 className="role">{t('home.subtitle')}</h2>
            <p className="description">{t('home.description')}</p>
          </div>

          <a href="#contact" className="contact-button">
            {t('home.contact')}
          </a>
        </div>

        <div className="skills-container">
          <SkillsWrapper>
            <SkillsTrack>
              {skills.map((skill, index) => (
                <div key={`skill-1-${index}`} className="skill-icon">
                  <i className={skill.icon} title={skill.name}></i>
                </div>
              ))}
              {skills.map((skill, index) => (
                <div key={`skill-2-${index}`} className="skill-icon">
                  <i className={skill.icon} title={skill.name}></i>
                </div>
              ))}
            </SkillsTrack>
          </SkillsWrapper>
        </div>
      </div>
    </section>
  )
}

export default Home  