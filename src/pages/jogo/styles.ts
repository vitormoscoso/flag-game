import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: clamp(8px, 2vw, 12px);
  overflow: hidden;
`;

export const GameCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: clamp(12px, 2.5vw, 20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 50%;
  width: 100%;
  max-height: 96vh;
  max-height: 96dvh;
  display: flex;
  flex-direction: column;
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

  @media (max-width: 768px) {
    border-radius: 16px;
    max-width: 90%;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 10px;
  flex-shrink: 0;
`;

export const ProgressBar = styled.div`
  background: #e2e8f0;
  height: 6px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

export const ProgressFill = styled.div<{ progress: number }>`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  width: ${(props) => props.progress}%;
  transition: width 0.3s ease;
`;

export const QuestionCounter = styled.p`
  font-size: clamp(0.75rem, 2.2vw, 0.85rem);
  color: #718096;
  margin: 0 0 6px 0;
  font-weight: 600;
`;

export const Title = styled.h1`
  font-size: clamp(1.1rem, 3.2vw, 1.4rem);
  color: #2d3748;
  margin: 0;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

export const FlagContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  flex-shrink: 0;
`;

export const FlagImage = styled.img`
  width: 100%;
  max-width: min(360px, 90vw);
  max-height: clamp(120px, 22vh, 200px);
  height: auto;
  object-fit: contain;
  padding: 5px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  background-color: #c2c4c4;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 600px) {
    max-height: clamp(110px, 20vh, 150px);
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
  flex-shrink: 0;
`;

export const OptionButton = styled.button<{
  selected?: boolean;
  correct?: boolean;
  wrong?: boolean;
  disabled?: boolean;
}>`
  padding: 10px 16px;
  font-size: clamp(0.8rem, 2.5vw, 0.95rem);
  display: flex;
  align-items: center;
  font-weight: 600;
  border: 2px solid
    ${(props) => {
      if (props.correct) return "#48bb78";
      if (props.wrong) return "#f56565";
      if (props.selected) return "#667eea";
      return "#e2e8f0";
    }};
  border-radius: 12px;
  background: ${(props) => {
    if (props.correct) return "#c6f6d5";
    if (props.wrong) return "#fed7d7";
    if (props.selected) return "#f7fafc";
    return "white";
  }};
  color: ${(props) => {
    if (props.correct) return "#22543d";
    if (props.wrong) return "#742a2a";
    return "#2d3748";
  }};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  opacity: ${(props) =>
    props.disabled && !props.correct && !props.wrong ? 0.5 : 1};

  &:hover {
    ${(props) =>
      !props.disabled &&
      !props.correct &&
      !props.wrong &&
      `
      border-color: #667eea;
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    `}
  }

  &::after {
    content: ${(props) => {
      if (props.correct) return '"✓"';
      if (props.wrong) return '"✗"';
      return '""';
    }};
    position: absolute;
    right: 20px;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export const NavigationContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
  flex-shrink: 0;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const NavButton = styled.button<{ variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 10px 18px;
  font-size: clamp(0.8rem, 2.5vw, 0.95rem);
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.variant === "primary"
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#e2e8f0"};
  color: ${(props) => (props.variant === "primary" ? "white" : "#2d3748")};
  box-shadow: ${(props) =>
    props.variant === "primary"
      ? "0 4px 15px rgba(102, 126, 234, 0.4)"
      : "0 2px 8px rgba(0, 0, 0, 0.1)"};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.variant === "primary"
        ? "0 6px 20px rgba(102, 126, 234, 0.6)"
        : "0 4px 12px rgba(0, 0, 0, 0.15)"};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Score = styled.div`
  text-align: center;
  margin-top: 8px;
  padding: 10px;
  background: #f7fafc;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  flex-shrink: 0;
`;

export const ScoreText = styled.p`
  font-size: clamp(0.8rem, 2.5vw, 0.95rem);
  color: #2d3748;
  margin: 0;
  font-weight: 600;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
`;

export const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #2d3748;
  margin-top: 20px;
`;

export const Spinner = styled.div`
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ShareContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 18px;
  font-size: clamp(0.85rem, 2.5vw, 1rem);
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.4);
  margin-top: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(72, 187, 120, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;
