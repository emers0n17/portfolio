import { useLanguage } from '../../contexts/LanguageContext'
import styled from 'styled-components'
import { SectionTitle } from '../shared/SectionTitle'
import imgPrimeiroProjecto from '../../assets/imgPrimeiroProjecto.jpg'
import imgSegundoProjecto from '../../assets/imgSegundoProjecto.jpg'
import imgTerceiroProjecto from '../../assets/imgTerceiroProjecto.jpg'
import imgQuartoProjecto from '../../assets/imgQuartoProjecto.jpg'
import imgQuintoProjecto from '../../assets/imgQuintoProjecto.jpg'

const ProjectsSection = styled.section`
  padding: 4rem 2rem;
  background: var(--bg-primary);
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const ProjectCard = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease;
  border: 1px solid var(--border-color);
  box-shadow: 0 0 10px rgba(72, 255, 167, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 0 15px rgba(72, 255, 167, 0.2);
  }
`

const ProjectImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ProjectInfo = styled.div`
  padding: 1.25rem;
`

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 500;
`

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`

const TechTag = styled.span`
  background: ${props => {
    const color = props.$tech ? techColors[props.$tech] || '#2d2d2d' : '#2d2d2d'
    return `${color}22`
  }};
  border: 1px solid ${props => {
    const color = props.$tech ? techColors[props.$tech] || '#2d2d2d' : '#2d2d2d'
    return color
  }};
  color: ${props => {
    const color = props.$tech ? techColors[props.$tech] || '#2d2d2d' : '#2d2d2d'
    return color
  }};
  border-radius: 6px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    background: ${props => {
      const color = props.$tech ? techColors[props.$tech] || '#2d2d2d' : '#2d2d2d'
      return `${color}33` // Aumenta a opacidade no hover
    }};
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
`

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  background: ${props => props.$primary ? 'var(--accent-color)' : 'var(--bg-secondary)'};
  color: ${props => props.$primary ? 'var(--text-primary)' : 'var(--text-primary)'};
  border: 1px solid ${props => props.$primary ? 'var(--accent-color)' : 'var(--border-color)'};

  &:hover {
    background: ${props => props.$primary ? 'var(--accent-color-dark)' : 'var(--bg-hover)'};
    color: ${props => props.$primary ? '#black' : 'var(--accent-color)'};
  }

  i {
    font-size: 1rem;
  }
`

const NoPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-size: 0.9rem;
`

const DisabledButton = styled(Button)`
  opacity: 0.6;
  cursor: not-allowed;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  
  &:hover {
    background: var(--bg-secondary);
    color: var(--text-secondary);
  }
`

const techColors = {
  'React': '#149ECA',
  'Node.js': '#539E43',
  'MongoDB': '#4DB33D',
  'Firebase': '#FFCA28',
  'Vue.js': '#42B883',
  'Angular': '#DD0031',
  'Next.js': '#000000',
  'TypeScript': '#3178C6',
  'JavaScript': '#F7DF1E',
  'Python': '#3776AB',
  'Java': '#007396',
  'MySQL': '#4479A1',
  'PostgreSQL': '#336791',
  'GraphQL': '#E535AB',
  'AWS': '#FF9900',
  'Docker': '#2496ED',
  'Kubernetes': '#326CE5',
  'Linux': '#FCC624',
  'Git': '#F05032',
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'Sass': '#CC6699',
  'Tailwind CSS': '#38BDF8',
  'Bootstrap': '#7952B3',
  'Material-UI': '#0081CB',
  'Redux': '#764ABC',
  'Express': '#000000',
  'AppWrite': '#F02E65',
  'Prisma': '#2D3748',
  'Vercel': '#000000',
  'OpenWeatherAPI': '#E96E50',
  'D3.js': '#F9A03C',
  'FireBase': '#FFCA28',
  'nodeJs': '#539E43',
  'openweatherapi': '#E96E50',
  'mysql': '#4479A1',
  'EmailJs': '#FF9000'
}

const projectsList = [
  {
    titlePt: '.START',
    titleEn: '.START',
    descriptionPt: 'Plataforma de venda de projectos',
    descriptionEn: 'Project sale platform',
    image: imgPrimeiroProjecto,
    demoUrl: 'https://start-flame-five.vercel.app/',
    githubUrl: 'https://github.com/emers0n17/start',
    technologies: ['React', 'Node.js', 'AppWrite']
  },
  {
    titlePt: 'Tempo Aqui',
    titleEn: 'Tempo Aqui',
    descriptionPt: 'Aplicativo de previsão do tempo com dados em tempo real e graficos de temperatura.',
    descriptionEn: 'Weather forecast app with real-time data and temperature charts.',
    image: imgSegundoProjecto,
    demoUrl: 'https://tempoaqui.vercel.app/',
    githubUrl: 'https://github.com/emers0n17/tempoaqui',
    technologies: ['React', 'OpenWeatherAPI', 'Tailwind CSS']
  },
  {
    titlePt: 'Agencia Paisana',
    titleEn: 'Agencia Paisana',
    descriptionPt: 'Startup de gestão e marketing digital.',
    descriptionEn: 'Digital management and marketing startup.',
    image: imgTerceiroProjecto,
    demoUrl: 'https://creative-minds-official.vercel.app/',
    githubUrl: 'https://github.com/emers0n17/creative-minds-official',
    technologies: ['React', 'Node.js', 'EmailJs']
  },
  {
    titlePt: 'ISPT - SGA',
    titleEn: 'ISPT - SGA',
    descriptionPt: 'Projecto de sitema de gestão academica integrado para o Instituto Superior Politécnico de Tete.',
    descriptionEn: 'Academic management system integrated for the Instituto Superior Politécnico de Tete.',
    image: imgQuartoProjecto,
    demoUrl: 'https://sistemaispt.vercel.app/',
    githubUrl: 'https://github.com/emers0n17/Sistema-de-gest-o-acad-mica',
    technologies: ['React', "nodeJs" , 'Firebase']
  },
  {
    titlePt: 'INSS - SGI',
    titleEn: 'INSS - SGI',
    descriptionPt: 'Sistema de gestão de invetario para o Instituto Nacional de Seguridade Social.',
    descriptionEn: 'Inventory management system for the National Institute of Social Security.',
    image: imgQuintoProjecto,
    demoUrl: 'https://github.com/emers0n17/Sistema-de-gerenciamento-de-inventario---INSS',
    githubUrl: 'https://github.com/emers0n17/Sistema-de-gerenciamento-de-inventario---INSS',
    technologies: ['React', 'Node.js', 'FireBase']
  },
  {
    titlePt: 'Aplicativo de previsão do tempo',
    titleEn: 'Weather App',
    descriptionPt: 'Aplicativo de previsão do tempo com dados em tempo real e graficos de temperatura para desktop.',
    descriptionEn: 'Weather forecast app with real-time data and temperature charts for desktop.',
    image: 'none',
    demoUrl: 'none',
    githubUrl: 'https://github.com/emers0n17/Aplicativo_de_previsao_de_tempo',
    technologies: ['Java','mysql','openweatherapi']
  }
]

function Projects() {
  const { language, t } = useLanguage()

  const getLocalizedField = (project, field) => {
    return language === 'pt' ? project[`${field}Pt`] : project[`${field}En`]
  }

  return (
    <ProjectsSection id="projects">
      <SectionTitle>
        <h2>
          <i className="fas fa-code-branch"></i>
          {t('projects.title')}
        </h2>
        <p>{t('projects.description')}</p>
      </SectionTitle>
      
      <ProjectsGrid>
        {projectsList.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImage>
              {project.image !== 'none' ? (
                <img src={project.image} alt={getLocalizedField(project, 'title')} />
              ) : (
                <NoPreviewContainer>No Preview</NoPreviewContainer>
              )}
            </ProjectImage>
            <ProjectInfo>
              <ProjectTitle>{getLocalizedField(project, 'title')}</ProjectTitle>
              <ProjectDescription>{getLocalizedField(project, 'description')}</ProjectDescription>
              <TechStack>
                {project.technologies.map((tech, techIndex) => (
                  <TechTag key={techIndex} $tech={tech}>
                    {tech}
                  </TechTag>
                ))}
              </TechStack>
              <ButtonsWrapper>
                {project.demoUrl !== 'none' ? (
                  <Button href={project.demoUrl} target="_blank" rel="noopener noreferrer" $primary>
                    <i className="fas fa-external-link-alt"></i>
                    {t('projects.viewProject')}
                  </Button>
                ) : (
                  <DisabledButton as="span" $primary>
                    <i className="fas fa-external-link-alt"></i>
                    No Demo
                  </DisabledButton>
                )}
                <Button href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                  {t('projects.viewCode')}
                </Button>
              </ButtonsWrapper>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  )
}

export default Projects 