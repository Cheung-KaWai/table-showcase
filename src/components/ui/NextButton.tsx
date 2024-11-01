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
    <Container $disable={disable} onClick={handleClick}>
      <TextContainer>
        <Arrow className="arrowTop" />
        <Arrow2 className="arrowBottom" />
        <Text>Next Step</Text>
      </TextContainer>
    </Container>
  );
};
const Container = styled.div<{ $disable: boolean }>`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 3rem;
  &:hover {
    div {
      pointer-events: ${(props) => (props.$disable ? "none" : "auto")};
      &::before {
        width: ${(props) => (props.$disable ? "8" : "16px")};
        height: ${(props) => (props.$disable ? "8" : "0px")};
        border-radius: ${(props) => (props.$disable ? "50%" : "10px")};
      }

      &::after {
        max-width: ${(props) => (props.$disable ? 0 : " 100px")};
      }

      .arrowTop {
        transition: transform 0.2s 0.55s cubic-bezier(0.02, -0.07, 0, 1.82);
        transform: rotate(30deg);
        opacity: 1;
      }

      .arrowBottom {
        transition: transform 0.2s 0.55s cubic-bezier(0.02, -0.07, 0, 1.82);
        transform: rotate(-30deg);
        opacity: 1;
      }
    }
  }
`;

const Arrow = styled.span`
  width: 8px;
  height: 2px;
  background-color: black;
  position: absolute;
  transform-origin: center right;
  border-radius: 10px;
  margin-left: 7px;
  opacity: 0;
`;

const Arrow2 = styled.span`
  width: 8px;
  height: 2px;
  background-color: black;
  position: absolute;
  transform-origin: center right;
  border-radius: 10px;
  margin-left: 7px;
  opacity: 0;
`;

const TextContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 5px;
  letter-spacing: 1px;

  padding-top: 2rem;

  &::before {
    content: "";
    transition: all 0.6s cubic-bezier(0.02, -0.07, 0, 1.82);
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
    transition: all 2s cubic-bezier(0.02, -0.07, 0, 1.82);
  }
`;
const Text = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
`;
