import styled from "styled-components";

interface StyledButtonProps {
  bgColor: string; // Adicione outras propriedades personalizadas conforme necessário
}

export const StyledButton = styled.button<StyledButtonProps>`
  border: 1px solid;
  width: 100%;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  background-color: ${(props) => props.bgColor || "transparent"};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  transition: background-color 0.3s;

  &:hover {
    background-color: #cccccc; /* Substitua pela cor desejada */
  }
`;
