import styled from 'styled-components'

export const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.5rem;
    background: linear-gradient(
      45deg,
      #ff0066,
      #6e0dd0,
      #0055ff
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300%;
    animation: gradient 10s linear infinite;
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
` 