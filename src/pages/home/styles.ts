import styled from "styled-components";

interface StyledButtonProps {
  bgColor: string; // Adicione outras propriedades personalizadas conforme necessário
}

export const PageConatiner = styled.div`
  /* position: fixed; */
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
`;

export const ContentConatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 100%;
`;

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

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
