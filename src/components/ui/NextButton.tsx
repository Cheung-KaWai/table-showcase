import { useState } from "react";
import styled from "styled-components";

export const NextButton = () => {
  const [disable, setDisable] = useState(false);

  const handleClick = () => {
    setDisable(true);

    setTimeout(() => {
      setDisable(false);
    }, 2000);
  };

  return (
    <Container>
      <TextContainer $disable={disable} onClick={handleClick}>
        <Text>Next Step</Text>
      </TextContainer>
    </Container>
  );
};
const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 3rem;
`;

const TextContainer = styled.div<{ $disable: boolean }>`
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 5px;
  letter-spacing: 1px;
  pointer-events: ${(props) => (props.$disable ? "none" : "auto")};
  padding-top: 2rem;

  &::before {
    content: "";
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
    display: inline-block;
    width: 8px;
    height: 8px;
    border: 1px solid;
    border-radius: 50%;
  }

  &::after {
    content: "dimensions";
    display: inline-block;
    font-size: 12px;
    text-transform: uppercase;
    max-width: 0;
    font-weight: 400;
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    &::before {
      width: ${(props) => (props.$disable ? "8px" : "16px")};
      height: ${(props) => (props.$disable ? "8px" : "0px")};
      border-radius: ${(props) => (props.$disable ? "50%" : "10px")};
    }

    &::after {
      max-width: ${(props) => (props.$disable ? 0 : " 100px")};
    }
  }
`;
const Text = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 400;
`;
