import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  animation: ${props => props.$isClosing ? slideOut : slideIn} 0.5s ease forwards;
`

const ToastContent = styled.div`
  padding: 1rem 2rem;
  border-radius: 8px;
  color: ${props => props.$type === 'success' ? '#155724' : '#721c24'};
  background: ${props => props.$type === 'success' ? '#d4edda' : '#f8d7da'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const Toast = ({ message, type, isClosing }) => (
  <ToastContainer $isClosing={isClosing}>
    <ToastContent $type={type}>
      <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} />
      {message}
    </ToastContent>
  </ToastContainer>
) 