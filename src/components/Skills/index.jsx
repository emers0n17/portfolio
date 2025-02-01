import { useLanguage } from '../../contexts/LanguageContext'
import { useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { SectionTitle } from '../shared/SectionTitle'

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const SkillsSection = styled.section`
  padding: 3rem 1rem;
  background-color: var(--bg-secondary);
  position: relative;
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`

const SkillCard = styled.div`
  background: var(--bg-primary);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.05),
      transparent
    );
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
  }

  &:hover {
    transform: translateY(-3px);
    &::before {
      animation: ${shimmer} 1.5s infinite linear;
    }
  }
`

const IconWrapper = styled.div`
  font-size: 1.8rem;
  color: ${props => props.color};
`

const SkillName = styled.h3`
  font-size: 0.9rem;
  color: var(--text-primary);
  margin: 0;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`

const Progress = styled.div.attrs(props => ({
  style: {
    width: `${props.$percentage}%`,
    background: props.$color
  }
}))`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 2px;
  transition: width 1s ease-out;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite linear;
  }
`

const Percentage = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.3rem;
`

function Skills() {
  const { t } = useLanguage()

  const skills = [
    { name: 'HTML', icon: 'fab fa-html5', color: '#E34F26', percentage: 90 },
    { name: 'CSS', icon: 'fab fa-css3-alt', color: '#1572B6', percentage: 85 },
    { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E', percentage: 70 },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB', percentage: 55 },
    { name: 'PHP', icon: 'fab fa-php', color: '#777BB4', percentage: 50 },
    { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1', percentage: 80 },
    { name: 'Java', icon: 'fab fa-java', color: '#007396', percentage: 60 },
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB', percentage: 40 },
    { name: 'C++', icon: 'fab fa-cuttlefish', color: '#00599C', percentage: 20 },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
    { name: 'Appwrite', icon: 'fas fa-server', color: '#F02E65' },
    { name: 'Firebase', icon: 'fas fa-fire', color: '#FFCA28' }
  ]

  return (
    <SkillsSection id="skills">
      <SectionTitle>
        <h2>
          <i className="fas fa-laptop-code"></i>
          {t('skills.title')}
        </h2>
        <p>{t('skills.description')}</p>
      </SectionTitle>
      
      <SkillsGrid>
        {skills.map((skill, index) => (
          <SkillCard key={index}>
            <IconWrapper color={skill.color}>
              <i className={skill.icon}></i>
            </IconWrapper>
            <SkillName>{skill.name}</SkillName>
            {skill.percentage && (
              <>
                <ProgressBar>
                  <Progress $color={skill.color} $percentage={skill.percentage} />
                </ProgressBar>
                <Percentage>{skill.percentage}%</Percentage>
              </>
            )}
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  )
}

export default Skills
