import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

export const Container: FC<PropsWithChildren> = (props) => {
  return <ContainerStyled>{props.children}</ContainerStyled>;
};

const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 253, 244, 1) 75%, rgba(255, 217, 177, 1) 100%);
`;
