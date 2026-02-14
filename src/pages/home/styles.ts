import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: clamp(10px, 2vw, 16px);
  overflow: hidden;
`;

export const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: clamp(16px, 3vw, 30px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 50%;
  width: 100%;
  max-height: 92vh;
  max-height: 92dvh;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    border-radius: 16px;
    max-width: 90%;
  }
`;

export const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: #2d3748;
  margin: 0 0 8px 0;
  text-align: center;
  font-weight: 700;

  @media (max-width: 600px) {
    line-height: 1.1;
  }
`;

export const Subtitle = styled.p`
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  color: #718096;
  text-align: center;
  margin: 0 0 16px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 12px 20px;
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.variant === 'primary' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e2e8f0'};
  color: ${props => props.variant === 'primary' ? 'white' : '#2d3748'};
  box-shadow: ${props => props.variant === 'primary' ? '0 4px 15px rgba(102, 126, 234, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.variant === 'primary' ? '0 6px 20px rgba(102, 126, 234, 0.6)' : '0 4px 12px rgba(0, 0, 0, 0.15)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const RegionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const RegionButton = styled.button`
  padding: 10px 14px;
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  font-weight: 600;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
`;

export const Input = styled.input`
  padding: 10px 14px;
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const ErrorMessage = styled.p`
  background: #fed7d7;
  color: #c53030;
  padding: 8px 12px;
  border-radius: 8px;
  margin: 0 0 12px 0;
  font-size: clamp(0.75rem, 2.2vw, 0.85rem);
  text-align: center;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  color: #2d3748;
  margin: 0 0 12px 0;
  font-weight: 600;
`;

export const Divider = styled.div`
  height: 1px;
  background: #e2e8f0;
  margin: 18px 0;
`;
